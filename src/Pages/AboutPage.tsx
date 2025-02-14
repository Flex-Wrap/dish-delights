const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-400">
        Welcome to our recipe collection! We are passionate about food and love sharing delicious meals 
        from around the world. Whether you're looking for a classic dish or something new, our collection has something for everyone.
      </p>
      <p className="text-gray-200 mt-4">
        This project was built with ❤️ using React and the <a href="https://www.themealdb.com/" className="text-orange-500 hover:underline">MealDB API</a>.
      </p>

      <p className="text-gray-200 mt-4">
        Other useful technologies include
        <a href="https://tailwindcss.com" className="text-blue-500 hover:underline"> Tailwind CSS </a> 
        and <a href="https://chatgpt.com" className="text-purple-500 hover:underline"> Chat GPT </a>.
      </p>

      {/* GIF at the bottom */}
      <div className="mt-6 flex justify-center">
        <img 
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTcxN2lsZWt1M3drdmM2aDhjeGg1ZWw0NzA0ZWlmNTljbWF6b2JkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13LlAxmDwAkopO/giphy.gif" 
          alt="Excited Chef GIF"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default AboutPage;
