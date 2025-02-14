const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-400">
        Have a question, feedback, or a recipe suggestion? We'd love to hear from you!
      </p>
      <div className="mt-6">
        <p className="text-gray-300">
          📧 Email: <a href="mailto:aaron97x3@gmail.com" className="text-orange-500 hover:underline"> gordonsLostBrother@themothership.com</a>
        </p>
        <br></br>
        <p className="text-gray-200">
          📍 Address: ISS, Hovering over your location, USA
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
