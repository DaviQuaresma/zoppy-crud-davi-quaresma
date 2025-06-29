import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isDark = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isDark = localStorage.getItem('theme') === 'dark';
      this.setTheme(this.isDark);
    }
  }

  toggleDarkMode(): void {
    this.isDark = !this.isDark;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
    this.setTheme(this.isDark);
  }

  setTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
