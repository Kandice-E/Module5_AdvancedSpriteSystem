BUILT WITH
-Three.js
-Vite

PROJECT OVERVIEW
-This project aims to demonstrate the use of sprites in Three.js with a focus on optimization strategies for large sprite systems. 
-The first scene portrays sprite animation and user interaction while the second showcases a texture applied to 30,000 sprites.

GETTING STARTED 
-TO VIEW THE APPLICATION: navigate to this section of my github page:
-TO RUN THE APP LOCALLY:
    -If not already downloaded, download and install Node.js: https://nodejs.org/en. The version used can be found in the package JSON file(download and extract project ZIP file).
    -Install the proper three.js version as stated in the package JSON file using the command: npm install --save three.
    -The Vite build tool was used to host the dev server and build the app. This version is also in the package JSON file: https://vite.dev/.
    -Next, from the directory you extracted the ZIP file to, run: npx vite.
    -A local server should be made available for interacting with the application.

IMPLEMENTED FEATURES
-As stated above, the first scene showcases minimal sprite generation focusing on interactive and animation features.
    -ANIMATIONS: Translations and rotations are applied to each sprite to simulate particle movement.
    -USER INTERACTION: Raycasting and event listeners enable users to click on the moving sprites and use wasd controls to move them along the x and z axes.
-The second scene utilizes a single THREE.Point instance to generate 30,000 sprites each rendered with the same snowflake texture.

CHALLENGES AND SOLUTIONS
-This project proved extremely challenging for me. I hit a roadblock every step of the way.
    -CHALLENGE: One prominent issue I had was animating the sprites while enclosing them in a bounding box for the snowflake scene. 
    -SOLUTION: After scouring the three.js website, examples, and forums, I managed to combine what I learned about displacing the vertices of the buffer geometry and creating a THREE.Box3 object to get the sprites to stay within my own specified range. I attempted to use the built in bounding box calculation, but I am still unclear on how to implement it properly.
    -CHALLENGE: Another challenge I had was implementing the required user interactions. Following the Three.js textbook examples proved difficult for me. Initially, I was unable to get the event listeners working correctly.
    -SOLUTION: Initially, the sprites would not highlight at all, and I kept getting an undefined reference error. I was able to track it down to using the incorrect syntax when applying the raycaster.
    -CHALLENGE: In conjunction with the interactive controls, I ran across a performance issue when switching between scenes. The issue was somewhere with the event listeners.
    -HALF SOLUTION: I added a conditional in the sprite interaction file in an attempt to bypass the logic containing the event listeners. This seems to have improved the performance slightly, however, further optimization is needed. I believe going back may require me to rethink memory management and better modularization of the code.

    CONTACT Kandice Estrella April 4th, 2025