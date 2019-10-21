package com.jgd.sms.web.rest;

import com.jgd.sms.domain.Passport;
import com.jgd.sms.repository.PassportRepository;
import com.jgd.sms.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.jgd.sms.domain.Passport}.
 */
@RestController
@RequestMapping("/api")
public class PassportResource {

    private final Logger log = LoggerFactory.getLogger(PassportResource.class);

    private static final String ENTITY_NAME = "passport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PassportRepository passportRepository;

    public PassportResource(PassportRepository passportRepository) {
        this.passportRepository = passportRepository;
    }

    /**
     * {@code POST  /passports} : Create a new passport.
     *
     * @param passport the passport to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new passport, or with status {@code 400 (Bad Request)} if the passport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/passports")
    public ResponseEntity<Passport> createPassport(@RequestBody Passport passport) throws URISyntaxException {
        log.debug("REST request to save Passport : {}", passport);
        if (passport.getId() != null) {
            throw new BadRequestAlertException("A new passport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Passport result = passportRepository.save(passport);
        return ResponseEntity.created(new URI("/api/passports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /passports} : Updates an existing passport.
     *
     * @param passport the passport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated passport,
     * or with status {@code 400 (Bad Request)} if the passport is not valid,
     * or with status {@code 500 (Internal Server Error)} if the passport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/passports")
    public ResponseEntity<Passport> updatePassport(@RequestBody Passport passport) throws URISyntaxException {
        log.debug("REST request to update Passport : {}", passport);
        if (passport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Passport result = passportRepository.save(passport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, passport.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /passports} : get all the passports.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of passports in body.
     */
    @GetMapping("/passports")
    public List<Passport> getAllPassports(@RequestParam(required = false) String filter) {
        if ("student-is-null".equals(filter)) {
            log.debug("REST request to get all Passports where student is null");
            return StreamSupport
                .stream(passportRepository.findAll().spliterator(), false)
                .filter(passport -> passport.getStudent() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Passports");
        return passportRepository.findAll();
    }

    /**
     * {@code GET  /passports/:id} : get the "id" passport.
     *
     * @param id the id of the passport to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the passport, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/passports/{id}")
    public ResponseEntity<Passport> getPassport(@PathVariable Long id) {
        log.debug("REST request to get Passport : {}", id);
        Optional<Passport> passport = passportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(passport);
    }

    /**
     * {@code DELETE  /passports/:id} : delete the "id" passport.
     *
     * @param id the id of the passport to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/passports/{id}")
    public ResponseEntity<Void> deletePassport(@PathVariable Long id) {
        log.debug("REST request to delete Passport : {}", id);
        passportRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
