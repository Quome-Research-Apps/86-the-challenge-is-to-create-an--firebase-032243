# **App Name**: MetaLearn Simulator

## Core Features:

- SRS Simulation: Simulate a Spaced Repetition System study session based on a sophisticated SRS algorithm (e.g., SM-2 or similar). The session will use a default flashcard set, and run until the user exits or a time limit is reached.
- Dynamic Flashcard Delivery: Algorithmically determine when and how often to show flashcards to the user, depending on how well they perform. The more they struggle with a flashcard, the more often the algorithm will show it to them.
- Study Interface: Provide a clean and intuitive interface for the study session. Present one flashcard at a time, and the ability to register the user's answer using an interface element, and a 'reveal answer' affordance.
- User Performance Recording: Log user's response timings and accuracy for each flashcard during the session, which the LLM tool can use during generation.
- Performance Visualization: Display the simulation results on a dashboard to reveal the data collected on user performance: flashcard difficulty versus review timings. Each screen should use well-formatted axes and clear labels.
- Learning Analysis Tool: Offer insights based on the SRS data. For example: highlight which flashcards took longer to learn and suggest improvements to learning strategies.
- Session Reset: Automatically clear all data at the end of each study session, effectively resetting the application to its initial state.

## Style Guidelines:

- Primary color: Soft, calming blue (#79A8D3) to foster focus and reduce cognitive load.
- Background color: Light, desaturated blue-gray (#DDE5ED) to provide a gentle backdrop.
- Accent color: Warm orange (#E59554) to draw attention to key elements like performance metrics.
- Font pairing: 'Belleza' (sans-serif) for headlines and 'Alegreya' (serif) for body text.
- Use simple, line-based icons to represent different performance metrics on the results dashboard.
- Use a clean, minimal layout with plenty of whitespace to avoid overwhelming the user with data.
- Incorporate subtle animations on the study results dashboard to smoothly transition between different data displays and emphasize learning patterns.