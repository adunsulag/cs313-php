After completing the assignment, please answer the questions in this text file and submit it to I-Learn.

1. Copy and paste the URL for your web application:
https://blooming-river-95663.herokuapp.com/

2. Copy and paste the URL for your source code repository (e.g., GitHub):
https://github.com/adunsulag/cs313-php

3. Briefly list and describe the elements of the application that are functioning. Include any special instructions about how to login and/or use your application.
- Professional look and feel
- Hand coded html
- Put all styles in an external stylesheet. (No inline styles.)
- At least one image
- Something dynamic -> Javascript driven search box, dynamic menu dropdown
- Include reasonable colors, images, etc. to show your creativity and personality (but don't forget to keep it somewhat professional).
- No run-time errors
- PHP is used to run the TWIG templating engine.  All the pages are driven using TWIG. Assignments are built dynamically from a php array and injected into the TWIG templating engine.

While most of this assignment is about reviewing client side Web development, you ought to make your page a .php file, and do at least one thing on the server (i.e. inside <?php ... ?> tags). This could be as simple as displaying the server time, or another common option is to use a php include to include the same header or navbar on each page. The exact things you do are up to you.

4. Briefly describe any pieces of the assignment that are not yet working correctly.
Everything is working.

5. Briefly describe the "coolest" thing you learned while completing this assignment.
The coolest piece was how to use the TWIG templating system manually without it being bundled into a framework like Symfony or Sylius.  Next coolest piece was CSS variables with bootstrap.  I've read about them but it was neat to see how to use them while I was experimenting with my color selections / theming.

6. What is the difference between an HTTP Get and Post? When should each be used?
HTTP Get is used to retrieve a resource from an HTTP compliant server. HTTP Get includes data in the URL string that is sent.  HTTP Post is used to send content to an HTTP compliant server and can have side effects. HTTP Post content can include additional data in the body of the request that is sent to the server.

7. Please select the category you feel best describes your assignment:
A - Some attempt was made
B - Developing, but significantly deficient
C - Slightly deficient, but still mostly adequate
D - Meets requirements
E - Shows creativity and excels above and beyond requirements

E.

8. Provide a brief justification (1-2 sentences) for selecting that category.
I experimented with and learned how to incorporate the PHP Twig templating system into my own project independent of a framework.  This shows creativity that goes above and beyond a simple php include.  I also went ahead and created an assignments page that is php data driven.  

