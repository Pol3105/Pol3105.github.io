# 👨‍💻 Pol3105 - Personal Portfolio

Welcome to the source code of my personal portfolio website. This project serves as my digital business card, showcasing my skills, academic projects, and software development journey.

🚀 **Live Demo:** [https://pol3105.github.io/](https://pol3105.github.io/)

## 💡 About The Project

This is a static website hosted on GitHub Pages, but it includes dynamic features to keep the content automatically updated. Instead of manually editing HTML every time I start a new project, the site "talks" to GitHub to fetch my latest work.

### Key Features

* **🟢 Real-Time Status Widget (New!):** Displays the exact message and time of my most recent commit from GitHub Events API, proving active development.
* **⚡ Dynamic Project Fetching:** Uses the GitHub REST API to automatically retrieve my public repositories.
* **🧹 Smart Filtering:** A JavaScript engine filters out minor sub-repositories (like specific university assignments) and groups them logically.
* **📅 Activity Tracker:** Visual indicators show which projects have been updated in the last 7 days.
* **🌍 Internationalization (i18n):** Full support for English and Spanish (EN/ES) with a custom vanilla JS switcher.
* **📱 Responsive Design:** Fully adaptable layout for desktop and mobile devices.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3.
* **Scripting:** Vanilla JavaScript (ES6+) - No heavy frameworks, just pure logic.
* **Data Source:** GitHub REST API (Users, Repos, **Events** endpoints).
* **Icons:** FontAwesome & Shields.io dynamic badges.

## 📂 How it Works

The project logic is split between two files (`js/api_github.js` for projects and `js/github_activity.js` for the widget). Here is the consolidated flow:

### Project Rendering Logic

1.  **Fetch:** The site requests my repository list sorted by update date.
2.  **Filter:** It applies a "blacklist" to exclude specific sub-repos or configuration files.
3.  **Enrich:** It generates dynamic badges and maps repository names to a custom dictionary for Spanish descriptions.
4.  **Render:** It injects the clean HTML cards into the DOM.

### Real-Time Status Widget Logic

The script checks the GitHub Events API for the latest `PushEvent` and dynamically updates the header with the commit time and repository name.

## 🚀 Local Development

If you want to run this locally or check the code:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Pol3105/Pol3105.github.io.git](https://github.com/Pol3105/Pol3105.github.io.git)
    ```
2.  **Open the project:**
    Simply open `index.html` in your preferred browser.

## 📬 Contact

Feel free to reach out if you want to collaborate or chat about code!

* **GitHub:** [Pol3105](https://github.com/Pol3105)
* **Portfolio:** [pol3105.github.io](https://pol3105.github.io/)

---
*This portfolio is automatically updated via the GitHub API.*