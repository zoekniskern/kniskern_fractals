# kniskern_fractals
Experimenting with fractals

///////////////////////
Aesthetic Goals:
For this project I wanted to experiment with a relationship between symmetry and fractals. Drawing on inspiration from symmetric drawing programs and the Rorschach test, I created a visual that incorporates variations of koch curves within a symmetric framework. The visual invites the audience to see patterns and emerging imagery in the overlap of opacity and vibrance through the generations of iterations.

///////////////////////
Development Process:
I knew that I wanted there to be a clear user interaction so building koch curves that would appear based on click events was the first step. This is broken down into the actual koch curve, making a related group of koch curves, and placing the group related to the user click.

I felt like a circle would be a clean and achievable base shape so I created an arc that then clips the koch curves that are drawn. Using getImage, this arc and it's visual content becomes maniputable pixels which enabled me to mirror the image.

To create variety I included random variables that influence the size, rotation and visual properties of the curves.

///////////////////////
Reflections:
The end result is interesting and incorporates principles that we learned. Because I ended up changing my initial idea so much it detracted from the amount of time I spent actually developing the concept. I am satisfied with the visual output but the code itself is very heavy handed and expensive to run. Definite room for improvement.



