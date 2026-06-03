# Commit Convention

> This document defines the commit message format for this portfolio repository.
> It serves as context for both human contributors and AI agents.

## Format

```
<emoji> <type>(<scope>): <description>
```

### Types & Emojis

| Emoji | Type       | Description                                      |
|-------|------------|--------------------------------------------------|
| ✨    | `feat`     | New feature or visible functionality              |
| 🐛    | `fix`      | Bug fix or correction                             |
| 💄    | `style`    | UI/UX changes (CSS, layout, animations, icons)    |
| ♻️    | `refactor` | Code restructuring without behavior change        |
| 📝    | `docs`     | Documentation changes                             |
| 🔧    | `chore`    | Tooling, config, dependencies, build              |
| 🌐    | `i18n`     | Translation or internationalization changes       |
| 🎨    | `design`   | Design system tokens, color palette, typography   |
| ⚡    | `perf`     | Performance improvements                          |
| 🧪    | `test`     | Adding or updating tests                          |
| 🗑️    | `remove`   | Removing code, files, or deprecated features      |
| 🚀    | `deploy`   | Deployment-related changes                        |
| 🔒    | `security` | Security fixes or improvements                    |

### Scopes

| Scope         | Description                                    |
|---------------|------------------------------------------------|
| `hero`        | Hero/landing section                           |
| `skills`      | Skills/tech stack section                      |
| `projects`    | Projects/case studies carousel                 |
| `about`       | About me section                               |
| `contact`     | Contact form and links                         |
| `navbar`      | Navigation bar                                 |
| `i18n`        | Translations dictionary (translations.js)      |
| `global`      | Global styles, layout, or cross-cutting        |
| `seo`         | Meta tags, Open Graph, structured data         |
| `a11y`        | Accessibility improvements                     |
| `mobile`      | Mobile-specific responsive changes             |
| `cookies`     | Cookie consent banner                          |
| `deps`        | Dependencies (package.json)                    |
| `ci`          | CI/CD pipeline                                 |

### Rules

1. **Language**: All commit messages MUST be in English.
2. **Description**: Use imperative mood ("add feature" not "added feature").
3. **Length**: Subject line max 72 characters.
4. **Body** (optional): Separate from subject with a blank line. Use bullet points for multiple changes.
5. **Breaking changes**: Prefix body with `BREAKING CHANGE:` if applicable.

### Examples

```
✨ feat(projects): add category badge system with color-coded labels

- Add university, government, freelance, and personal categories
- Implement visual badges with border-left accent colors
- Clean descriptions by extracting context to dedicated badges

💄 style(hero): add terminal cursor blink animation

🌐 i18n(projects): add category label translations for ES and EN

♻️ refactor(projects): extract category config to dedicated object

🐛 fix(mobile): resolve tooltip overlap on skills section

🔧 chore(deps): upgrade astro to v5.18.0
```

## Project Categories

For reference, this portfolio uses the following project classification:

| Category     | Color         | Hex       | Projects                                    |
|-------------|---------------|-----------|---------------------------------------------|
| University  | Violet        | `#a78bda` | SGCP Legacy (Angular), U-TEXT (Flutter)      |
| Government  | Steel Blue    | `#6b8aae` | Asset Management (Go), Warehouse (Laravel)   |
| Freelance   | Emerald       | `#5ea88e` | Jutba Streaming (Flutter)                    |
| Personal    | Tungsten      | `#ffd7aa` | Ve-Exchange (Expo), Movilnet Checker (Expo)  |

## Design Tokens

| Token                     | Value       | Usage                          |
|--------------------------|-------------|--------------------------------|
| `--color-base`           | `#0a0a0a`   | Page background                |
| `--color-surface`        | `#141414`   | Card/panel background          |
| `--color-tungsten`       | `#ffd7aa`   | Primary accent (warm copper)   |
| `--color-text-primary`   | `#f0f0f0`   | Headings, primary text         |
| `--color-text-secondary` | `#888888`   | Body text, descriptions        |
| `--color-border`         | `#2a2a2a`   | Subtle borders                 |
| `--font-mono`            | JetBrains Mono | Code, badges, terminal text |
| `--font-sans`            | Inter        | Body text, headings            |
