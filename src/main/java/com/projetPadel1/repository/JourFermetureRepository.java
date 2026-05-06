package com.projetPadel1.repository;

import com.projetPadel1.entity.JourFermeture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourFermetureRepository extends JpaRepository<JourFermeture, Long> {

}
