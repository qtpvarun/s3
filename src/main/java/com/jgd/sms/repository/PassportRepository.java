package com.jgd.sms.repository;
import com.jgd.sms.domain.Passport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Passport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PassportRepository extends JpaRepository<Passport, Long> {

}
