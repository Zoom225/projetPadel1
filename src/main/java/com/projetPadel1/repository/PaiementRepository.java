package com.projetPadel1.repository;

import com.projetPadel1.entity.Paiement;
import com.projetPadel1.entity.enums.StatutPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    Optional<Paiement> findByReservationId(Long reservationId);
    List<Paiement> findByStatut(StatutPaiement statut);
    List<Paiement> findByReservationMembreId(Long membreId);
}
