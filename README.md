
# Sentinel Shield: Next-Gen Facility Command Center

![Sentinel Shield Dashboard](https://placehold.co/1200x600.png/0A0F14/14FFEC?text=Sentinel+Shield+UI)
<p align="center"><i>A futuristic, AI-powered command center for monitoring and managing high-security facilities.</i></p>

---

**Sentinel Shield** is a conceptual, forward-thinking web application demonstrating a sophisticated user interface for a nuclear facility's command and control system. It integrates real-time monitoring, predictive threat analysis, and operational management into a single, cohesive, and aesthetically futuristic platform.

This project is built with a modern, type-safe, and performant tech stack, showcasing best practices in web development with a focus on UI/UX, responsiveness, and interactivity.

## ✨ Core Features

The application is structured into several key modules, each serving a distinct operational purpose:

*   **Dashboard (`/`)**: The central landing page providing a high-level overview of the facility's status. It features a real-time threat level indicator, a live alert feed, and quick access to all other modules.
*   **Predictive Threat Analyzer (`/analyzer`)**: Utilizes a mock AI (powered by **Genkit**) to analyze environmental, facility, historical, and intelligence data streams. It predicts potential CBRN threat scenarios, assesses their impact, and recommends mitigation strategies.
*   **AR Simulation (`/simulation`)**: A module for launching immersive Augmented Reality training scenarios. The active simulation page (`/simulation/active`) demonstrates a proof-of-concept using a live camera feed with a futuristic HUD overlay to simulate anomaly detection.
*   **Secure Communications Hub (`/comms`)**: An encrypted, real-time chat interface for seamless coordination between facility personnel and external agencies like the DAE and NDRF.
*   **Geospatial Threat & Asset Console (`/geo-map`)**: An interactive console displaying facility map data with overlays for sensors, personnel, security zones, and threat propagation.
*   **Integrated Drone Surveillance (`/drones`)**: A network view for real-time aerial reconnaissance feeds from a fleet of automated drones, complete with telemetry data and operational controls.
*   **Facility Digital Twin (`/digital-twin`)**: A dynamic, data-rich digital replica of the facility. It monitors real-time energy output, system health, environmental conditions, and tracks critical maintenance schedules.
*   **Anomaly Correlation Engine (`/anomalies`)**: Ingests and correlates disparate anomaly events (e.g., sensor spikes, network intrusion) to identify emergent, complex threat patterns that might otherwise go unnoticed.
*   **Emergency Response Coordinator (`/emergency`)**: A centralized command console for managing active critical incidents, dispatching response teams (Security, HAZMAT, Medical), and tracking resource allocation in real-time.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable technology stack, emphasizing developer experience and performance.

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and composable components.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for creating fluid animations.
*   **AI/Generative**: [Google's Genkit](https://firebase.google.com/docs/genkit) - An open-source framework for building AI-powered features, used here for the Predictive Threat Analyzer.
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for type-safe, performant form validation.
*   **Icons**: [Lucide React](https://lucide.dev/) - A beautiful and consistent icon library.
*   **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) for seamless light/dark mode switching.

## 🚀 Getting Started

Follow these steps to get the Sentinel Shield project up and running on your local machine for development and testing.

### 1. Prerequisites

Make sure you have the following installed on your system:
*   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
*   [Git](https://git-scm.com/)

### 2. Clone the Repository

Open your terminal or command prompt and clone the project from its GitHub repository.

```bash
git clone https://github.com/your-username/sentinel-shield.git
```
*(Replace `https://github.com/your-username/sentinel-shield.git` with the actual repository URL)*

### 3. Navigate to the Project Directory

Change into the newly created project folder.

```bash
cd sentinel-shield
```

### 4. Install Dependencies

Install all the required npm packages.

```bash
npm install
```

### 5. Set Up Environment Variables

The project uses environment variables for sensitive information like API keys.

1.  Create a new file named `.env.local` in the root of the project. You can do this by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
2.  Open the `.env.local` file and add your **Google AI API Key**. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY=your_google_ai_api_key_here
    ```
    This key is necessary for the **Predictive Threat Analyzer** feature to function correctly.

### 6. Open in VS Code

Launch Visual Studio Code and open the project folder.

```bash
code .
```

### 7. Run the Development Server

Start the Next.js development server. The application uses Turbopack for faster development performance.

```bash
npm run dev
```

The application should now be running. You can view it in your browser at:
**[http://localhost:9002](http://localhost:9002)**

You are now ready to explore the code, make changes, and see them reflected live in your browser!
