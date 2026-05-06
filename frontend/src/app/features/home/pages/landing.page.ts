import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatchesApiService } from '../../../core/api/matches-api.service';
import { MemberSessionService } from '../../../core/auth/member-session.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-padel-50 via-court-50 to-blue-50 overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-20 left-10 w-72 h-72 bg-padel-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-court-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style="animation-delay: 4s;"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 py-12 max-w-4xl mx-auto">
        <!-- Emoji animé -->
        <div class="mb-8 flex justify-center">
          <div class="text-9xl animate-bounce-slow">🎾</div>
        </div>

        <!-- Titre principal -->
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
          Bienvenue sur <span class="bg-gradient-to-r from-padel-600 to-court-600 bg-clip-text text-transparent">PadelPlay</span>
        </h1>

        <!-- Sous-titre -->
        <p class="text-xl md:text-2xl text-slate-700 mb-8 font-medium">
          La plateforme de réservation de terrains de padel la plus dynamique ! 🚀
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          @if (!memberSession.isAuthenticated()) {
            <a routerLink="/member"
               class="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-padel-600 to-padel-500 rounded-full shadow-padel hover:shadow-padel-lg hover:scale-105 transition-all duration-300">
              👤 Accès Membre
            </a>
          }

          <a routerLink="/admin/login"
             class="px-8 py-4 text-lg font-bold text-padel-700 bg-white border-2 border-padel-600 rounded-full hover:bg-padel-50 transition-all duration-300">
            🔐 Admin
          </a>
        </div>

        <!-- Test API Button -->
        <button (click)="checkApi()" [disabled]="loading()"
                class="px-6 py-3 text-sm font-semibold text-court-700 bg-white border-2 border-court-400 rounded-full hover:bg-court-50 disabled:opacity-50 transition-all duration-300">
          @if (loading()) {
            ⏳ Test en cours...
          } @else {
            ✅ Tester l'API
          }
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-black text-center text-slate-900 mb-16">Nos Forces 💪</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-padel-50 to-padel-100 border-2 border-padel-200 hover:shadow-padel hover:scale-105 transition-all duration-300">
            <div class="text-5xl mb-4">🎾</div>
            <h3 class="text-2xl font-bold text-padel-900 mb-2">Réservations Simples</h3>
            <p class="text-padel-700">Réservez vos terrains en quelques clics avec notre interface intuitive</p>
          </div>

          <!-- Feature 2 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-court-50 to-court-100 border-2 border-court-200 hover:shadow-court hover:scale-105 transition-all duration-300">
            <div class="text-5xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold text-court-900 mb-2">Ultra Rapide</h3>
            <p class="text-court-700">Confirmations instantanées et gestion en temps réel de vos matchs</p>
          </div>

          <!-- Feature 3 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div class="text-5xl mb-4">💰</div>
            <h3 class="text-2xl font-bold text-purple-900 mb-2">Paiements Sécurisés</h3>
            <p class="text-purple-700">Système de paiement robuste et gestion des pénalités transparente</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div class="max-w-4xl mx-auto">
        <div class="rounded-3xl bg-white p-12 shadow-padel overflow-hidden border-l-4 border-padel-600">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">🎯 À propos du Projet</h2>
          <p class="text-lg text-slate-700 mb-4">
            PadelPlay est une application web moderne construite avec les dernières technologies :
          </p>
          <div class="grid md:grid-cols-3 gap-6 mt-8">
            <div class="flex gap-3">
              <span class="text-2xl">⚙️</span>
              <div>
                <p class="font-bold text-slate-900">Backend</p>
                <p class="text-slate-600">Spring Boot 3</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="text-2xl">🎨</span>
              <div>
                <p class="font-bold text-slate-900">Frontend</p>
                <p class="text-slate-600">Angular + Tailwind</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="text-2xl">🐘</span>
              <div>
                <p class="font-bold text-slate-900">Database</p>
                <p class="text-slate-600">PostgreSQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-8">Résultat du Test API 📊</h2>

        <div class="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 border-2 border-slate-200">
          @if (loading()) {
            <div class="flex justify-center py-12">
              <div class="relative w-12 h-12">
                <div class="absolute inset-0 rounded-full border-4 border-padel-200 border-t-padel-600 animate-spin"></div>
              </div>
            </div>
          }

          @if (message()) {
            <div class="status-success justify-center gap-3">
              <span>✨</span>
              <span>{{ message() }}</span>
            </div>
          }

          @if (error()) {
            <div class="status-error justify-center gap-3">
              <span>⚠️</span>
              <span>{{ error() }}</span>
            </div>
          }

          @if (!loading() && !message() && !error()) {
            <p class="text-center text-slate-600 py-8">Cliquez sur le bouton ci-dessus pour tester la connexion à l'API</p>
          }
        </div>
      </div>
    </section>
  `
})
export class LandingPage {
  private readonly matchesApi = inject(MatchesApiService);
  readonly memberSession = inject(MemberSessionService);

  readonly loading = signal(false);
  readonly count = signal<number | null>(null);
  readonly error = signal<string>('');
  readonly message = computed(() => {
    if (this.count() === null) {
      return '';
    }

    return `Proxy OK - ${this.count()} match(s) public(s) recupere(s)`;
  });

  checkApi(): void {
    this.loading.set(true);
    this.error.set('');

    this.matchesApi.getPublic().subscribe({
      next: (matches) => {
        this.count.set(matches.length);
        this.loading.set(false);
      },
      error: () => {
        this.count.set(null);
        this.error.set('Echec de l appel API. Verifie que le backend tourne sur le port 8080.');
        this.loading.set(false);
      }
    });
  }
}
