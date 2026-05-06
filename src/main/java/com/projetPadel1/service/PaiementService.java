package com.projetPadel1.service;

import com.projetPadel1.entity.Paiement;

import java.util.List;

public interface PaiementService {
    Paiement pay(Long reservationId, Long membreId);
    Paiement getById(Long id);
    Paiement getByReservationId(Long reservationId);
    List<Paiement> getByMembreId(Long membreId);
    void checkUnpaidBeforeMatch();
}
