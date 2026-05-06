package com.projetPadel1.service;

import com.projetPadel1.dto.request.LoginRequest;
import com.projetPadel1.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
