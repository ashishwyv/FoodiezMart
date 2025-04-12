# FoodiezMart

A modern, responsive web application built with React and TailwindCSS that lets users explore food products using the OpenFoodFacts API. Users can search, filter, and view detailed product information including nutrition grades, ingredients, and categories.

## Features

### ✅ Homepage

Displays a dynamic list of food products.

Uses infinite scrolling to seamlessly load more items.

Each product shows:

Product name

Image

Category

Ingredients (if available)

Nutrition grade (A–E)
![Screenshot 2025-04-12 100937](https://github.com/user-attachments/assets/0f95b77d-9aa4-4e0b-9c11-56eef72edfa7)
-> this is the interactive landing page
![Screenshot 2025-04-12 100955](https://github.com/user-attachments/assets/42ebed45-23c0-4f2d-afb6-75b35cde19a2)
-these items being shown on the homepage

### 🔍 Search Functionality
Users can search by product name to quickly find relevant results.

Barcode search is also supported using OpenFoodFacts’ barcode endpoint.

![Screenshot 2025-04-12 101631](https://github.com/user-attachments/assets/162c8c00-f7ea-41b9-9676-adae275dfab8)
->this is the search component with items being displayed.
  
### 🗂️ Category Filter
Products can be filtered by category (e.g., Beverages, Dairy, Snacks).

Categories are fetched dynamically from the API.

### ↕️ Sorting
Sort by:

Product Name (A-Z, Z-A)

Nutrition Grade (Ascending/Descending)

### 📦 Product Detail Page
Each product card links to a detailed page with:

High-resolution image

Full ingredient list

Nutrition table (energy, fat, carbs, proteins, etc.)

Dietary labels (vegan, gluten-free, etc.)

![Screenshot 2025-04-12 101029](https://github.com/user-attachments/assets/9ddcfed8-9563-4822-9880-6753ca48a3e2)
->this is the Product detail component 

### ⚙️ Tech Stack
React — Frontend framework

Tailwind CSS — Styling

Axios — API handling

React Router DOM — Navigation between pages

### 🧠 Approach
Followed component-based architecture to ensure modular and maintainable code.

Used useEffect and useCallback for clean and optimized data fetching.

Implemented infinite scrolling using an IntersectionObserver.

Created reusable components for Cards, Navigation, and Search.

Handled error states gracefully when data is missing or incomplete.

Applied utility-first styling with Tailwind for rapid UI development.

###💡 Future Improvements
Add a cart system with global state management (Redux/Context API).

Add user authentication for saving favorite items.

Enhance accessibility and SEO for broader reach.

