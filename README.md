# 👨‍💻 Pol3105 - Personal Portfolio

Welcome to the source code of my personal portfolio website. This project serves as my digital business card, showcasing my skills, academic projects, and software development journey.

🚀 **Live Demo:** [https://pol3105.github.io/](https://pol3105.github.io/)

## 💡 About The Project

This is a static website hosted on GitHub Pages, but it includes dynamic features to keep the content automatically updated. Instead of manually editing HTML every time I start a new project, the site "talks" to GitHub to fetch my latest work.

### Key Features

* **⚡ Dynamic Project Fetching:** Uses the GitHub REST API to automatically retrieve my public repositories.
* **🧹 Smart Filtering:** A JavaScript engine filters out minor sub-repositories (like specific university assignments) and groups them logically.
* **🟢 Activity Tracker:** Visual indicators show which projects have been updated in the last 7 days.
* **🌍 Internationalization (i18n):** Full support for English and Spanish (EN/ES) with a custom vanilla JS switcher.
* **📱 Responsive Design:** Fully adaptable layout for desktop and mobile devices.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3.
* **Scripting:** Vanilla JavaScript (ES6+) - No heavy frameworks, just pure logic.
* **Data Source:** GitHub REST API (Users & Repos endpoints).
* **Icons:** FontAwesome & Shields.io dynamic badges.

## 📂 How it Works

The core logic resides in `js/api_github.js`. Here is the flow:

1.  **Fetch:** The site requests my repository list sorted by update date.
2.  **Filter:** It applies a "blacklist" to exclude specific sub-repos or configuration files.
3.  **Enrich:** It generates dynamic badges based on the repository's main language.
4.  **Translate:** It maps repository names to a custom dictionary for Spanish descriptions.
5.  **Render:** Finally, it injects the clean HTML cards into the DOM.

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