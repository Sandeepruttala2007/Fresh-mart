🛒 FreshMart

FreshMart is a full-stack e-commerce web application designed to provide a simple and user-friendly shopping experience. The platform allows users to browse products, add items to a cart, and place orders through a backend system. It is built mainly for learning full-stack development concepts, including frontend interaction, backend APIs, and data handling.

The frontend of FreshMart is developed using HTML, CSS, and JavaScript, which creates a responsive and interactive user interface. The backend is built using Node.js and Express.js, which handles API requests such as fetching products and processing orders. Instead of using a traditional database, the project uses JSON files (data.json and db.json) as a mock database to store product and order information.

The project structure is simple and well-organized, containing separate files for frontend and backend logic. The index.html file serves as the main UI, while style.css handles the design and layout. The script.js file manages dynamic behaviors such as cart updates and API calls. On the backend side, server.js is responsible for handling routes and processing requests.

To run the project locally, the user needs to install dependencies using npm and start the backend server using Node.js. Once the server is running, the frontend can be accessed by opening the index.html file in a browser. The application communicates with the backend through API endpoints like GET /products for fetching product data and POST /create-order for placing orders.

The core functionality of FreshMart includes displaying products dynamically, allowing users to add or remove items from the cart, updating quantities in real-time, and sending order details to the backend. The application flow starts with loading product data, displaying it on the UI, managing cart interactions, and finally processing the order through the backend API.

This project has been tested for key functionalities such as product loading, cart operations, and backend communication to ensure smooth performance. It serves as a foundational project for understanding how e-commerce systems work.

FreshMart is also deployment-ready and can be hosted easily. The frontend can be deployed on platforms like Vercel, while the backend can be deployed on services like Render. Environment configuration and proper setup allow the application to run in production.

In the future, FreshMart can be enhanced by adding user authentication, integrating payment gateways such as Razorpay or Stripe, upgrading to a real database like MongoDB, and building an admin dashboard. These improvements can transform it into a fully functional production-level e-commerce application.

The project was developed by Sandeep Ruttala as part of learning and academic work, and it demonstrates practical implementation of full-stack web development concepts.
