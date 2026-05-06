package com.projetPadel1.dto.response;

import com.projetPadel1.entity.enums.TypeAdministrateur;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private String email;
    private String nom;
    private String prenom;
    private TypeAdministrateur role;
    private Long siteId;
}
