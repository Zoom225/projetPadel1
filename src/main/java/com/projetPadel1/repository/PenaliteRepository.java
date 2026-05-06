package com.projetPadel1.repository;


import com.projetPadel1.entity.Penalite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface PenaliteRepository extends JpaRepository<Penalite, Long> {
    boolean existsByMembreIdAndDateFinAfter(Long membreId, LocalDate date);
}
