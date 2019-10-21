package com.jgd.sms.web.rest;

import com.jgd.sms.S3App;
import com.jgd.sms.domain.Passport;
import com.jgd.sms.repository.PassportRepository;
import com.jgd.sms.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jgd.sms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PassportResource} REST controller.
 */
@SpringBootTest(classes = S3App.class)
public class PassportResourceIT {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PassportRepository passportRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPassportMockMvc;

    private Passport passport;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PassportResource passportResource = new PassportResource(passportRepository);
        this.restPassportMockMvc = MockMvcBuilders.standaloneSetup(passportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Passport createEntity(EntityManager em) {
        Passport passport = new Passport()
            .number(DEFAULT_NUMBER);
        return passport;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Passport createUpdatedEntity(EntityManager em) {
        Passport passport = new Passport()
            .number(UPDATED_NUMBER);
        return passport;
    }

    @BeforeEach
    public void initTest() {
        passport = createEntity(em);
    }

    @Test
    @Transactional
    public void createPassport() throws Exception {
        int databaseSizeBeforeCreate = passportRepository.findAll().size();

        // Create the Passport
        restPassportMockMvc.perform(post("/api/passports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passport)))
            .andExpect(status().isCreated());

        // Validate the Passport in the database
        List<Passport> passportList = passportRepository.findAll();
        assertThat(passportList).hasSize(databaseSizeBeforeCreate + 1);
        Passport testPassport = passportList.get(passportList.size() - 1);
        assertThat(testPassport.getNumber()).isEqualTo(DEFAULT_NUMBER);
    }

    @Test
    @Transactional
    public void createPassportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = passportRepository.findAll().size();

        // Create the Passport with an existing ID
        passport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPassportMockMvc.perform(post("/api/passports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passport)))
            .andExpect(status().isBadRequest());

        // Validate the Passport in the database
        List<Passport> passportList = passportRepository.findAll();
        assertThat(passportList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPassports() throws Exception {
        // Initialize the database
        passportRepository.saveAndFlush(passport);

        // Get all the passportList
        restPassportMockMvc.perform(get("/api/passports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(passport.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())));
    }
    
    @Test
    @Transactional
    public void getPassport() throws Exception {
        // Initialize the database
        passportRepository.saveAndFlush(passport);

        // Get the passport
        restPassportMockMvc.perform(get("/api/passports/{id}", passport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(passport.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPassport() throws Exception {
        // Get the passport
        restPassportMockMvc.perform(get("/api/passports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePassport() throws Exception {
        // Initialize the database
        passportRepository.saveAndFlush(passport);

        int databaseSizeBeforeUpdate = passportRepository.findAll().size();

        // Update the passport
        Passport updatedPassport = passportRepository.findById(passport.getId()).get();
        // Disconnect from session so that the updates on updatedPassport are not directly saved in db
        em.detach(updatedPassport);
        updatedPassport
            .number(UPDATED_NUMBER);

        restPassportMockMvc.perform(put("/api/passports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPassport)))
            .andExpect(status().isOk());

        // Validate the Passport in the database
        List<Passport> passportList = passportRepository.findAll();
        assertThat(passportList).hasSize(databaseSizeBeforeUpdate);
        Passport testPassport = passportList.get(passportList.size() - 1);
        assertThat(testPassport.getNumber()).isEqualTo(UPDATED_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPassport() throws Exception {
        int databaseSizeBeforeUpdate = passportRepository.findAll().size();

        // Create the Passport

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPassportMockMvc.perform(put("/api/passports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passport)))
            .andExpect(status().isBadRequest());

        // Validate the Passport in the database
        List<Passport> passportList = passportRepository.findAll();
        assertThat(passportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePassport() throws Exception {
        // Initialize the database
        passportRepository.saveAndFlush(passport);

        int databaseSizeBeforeDelete = passportRepository.findAll().size();

        // Delete the passport
        restPassportMockMvc.perform(delete("/api/passports/{id}", passport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Passport> passportList = passportRepository.findAll();
        assertThat(passportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Passport.class);
        Passport passport1 = new Passport();
        passport1.setId(1L);
        Passport passport2 = new Passport();
        passport2.setId(passport1.getId());
        assertThat(passport1).isEqualTo(passport2);
        passport2.setId(2L);
        assertThat(passport1).isNotEqualTo(passport2);
        passport1.setId(null);
        assertThat(passport1).isNotEqualTo(passport2);
    }
}
