# Identity-Crisis-Hackathon

Identity Crisis – a social deduction game exploring AI’s limits and human imitation

Project Overview

Identity Crisis is a multiplayer social deduction game where human players and an AI compete to answer open-ended prompts. After everyone submits a response, an AI-generated answer is added, crafted to blend in and mimic human creativity, tone, and nuance. Hence, we’re experimenting with AI’s ability to show emotions and are using human intelligence and AI in our game. Players then vote on which answer they think was written by the AI.

The game is about identifying the subtle differences between authentic human expression and machine-generated responses. Whether it's interpreting tone, spotting a lack of context, or reading between the lines, players must rely on their intuition, emotional intelligence, and critical thinking. The AI, in turn, attempts to fool everyone by sounding convincingly human.

It’s a test of how well we understand ourselves, and how well machines are starting to understand us. The game pushes the limits of AI’s understanding of nuanced, creative human expression, turning the chaotic mix of real and artificial into a fun challenge. Thus, players are invited to reflect on the philosophical implications of AI in creative fields, asking themselves what it truly means to be human in a world where machines can mimic creativity.

The problem we are investigating: Current AI systems often struggle to fully replicate human nuance and dialect, particularly in more informal communication. Meanwhile, as AI-generated content becomes more prevalent, distinguishing genuine human output from AI output will become more challenging and even more important.

What inspired us?

The inspiration for ‘Identity Crisis’ came from the growing interest in AI-generated content and the challenge of distinguishing between human and machine-produced text. With the rise of AI in creative fields, we wanted to explore how far AI can go in mimicking human creativity / emotion and how well people can distinguish between the two, forcing players to tap into their own emotional intelligence. The game aims to highlight the nuanced nature of human expression, while pushing the boundaries of AI's understanding of this creativity and dialect.

Technologies we used:

**Backend: ** Next.js (Server Actions), Genkit (Google AI) - we used Next.js as it lets us build both frontend and backend in one codebase, simplifying development and deployment. Server Actions handle game logic like room management, player states, and secure operations (e.g., AI calls, score updates) directly on the server. We used Genkit as it helps streamlines Gemini AI integration for sentence rephrasing, making it easier to develop, monitor, and scale the core AI feature.

**Frontend: ** The frontend is a Next.js application built with React, TypeScript, and styled with Tailwind CSS and ShadCN UI components. Next.js was used as it’s a good component-based UI framework for building interactive (and high performing) web pages. TypeScript is a sort of safety net; it catches errors early and improves code quality and maintainability. Tailwind CSS is good for rapidly styling our code, so it means smaller file sizes- it’s a ‘utility first’ CSS framework. ShadCN UI Components is good as it gives us reusable, accessible and highly customisable UI building blocks - we were able to quickly develop the UI

**Database: ** Cloud Firestore (Firebase) This was one of the only freemium databases that we hadn't used up our tokens for (lolz!). It’s good for storing dynamic data which our game uses, and google can handle it for us as well, so it gets integrated into the google workflow (we were also using Gemini API).

Game Flow

1 - Players join a game room (shared game session). 2 - The game starts with a randomly selected unique prompt being sent to all players. 3 - Players submit their creative answers within a timed phase. 4 - The AI generates its answer, tinkered to sound as human as possible, for each player’s submission. 5 - The voting phase begins where players guess which answers are truly human. 6 - Results are tallied, scores updated, and coins awarded. 7 - The game proceeds to the next round or ends after the maximum rounds.

Our Track:

We are submitting to the "Push the Limits: Beyond Automation" track. This track challenges us to explore AI's capabilities and where it falls short in its attempt to be human. In our game, we explore the capacity of AI to speak, think and understand information like humans whilst also promoting our humanity in the form of language and speech.

Real world practical applications

Educational tool: Teaches students how to identify AI-generated content vs. human responses, helping them avoid misinformation online.

Debates on AI ethics: Prompts discussions on the ethics of AI and its impact on authorship, helping people critically assess AI-generated content.

Promotes empathy and intuition: Encourages empathy and intuition to better differentiate between human and AI responses in digital media.

Bringing together communities: This is a party game, bringing friends / communities together through fun. People also have the opportunity to share their culture through the answering on the questions, which the AI is tinkered to appreciate and understand. Our game fosters discussions on AI’s impact, bringing people together to reflect on how AI influences culture and media.

Coming up with our idea

1 – We initially came up with a list of problems with AI. Each team member came up with these problems live on a digital Miro board, with some examples seen in the following images:

The different colours depict the ideas made by different team members, which were presented to the team and reviewed.

2 – We then generated some ideas for our project which combine both solutions for the problems we wanted to solve, as well as suiting the criteria of one of the strands of the hackathon. We put these ideas on a graph scaling the value of the project and how much effort was needed to produce the final product, so we could shortlist the best idea. We reviewed each others’ ideas to ensure this was fairly accurate and reliable :D.

3 – We then proceeded to rank the shortlisted ideas out of 10 on how much they would excel in each one of the points in the criteria for the project, to find an average of every idea. Importantly, we didn’t blindly base it off numbers, we more so used it as a guide, but had conversations to decide based on our beliefs on the suitability of these ideas to the hackathon’s purpose.

4 – Finally, we took the highest scoring idea (based by its average) and improved it significantly to perfectly fit strand 1 – where we explore what AI thinks it can do (in our case, to try and sound human – more human than the actual players in our game!). We then held another meeting to share further opinions and decided on the idea.

Youtube Video
https://www.youtube.com/watch?v=AiD6f6BXFv8
