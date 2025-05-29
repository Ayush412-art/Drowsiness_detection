function Pricing_data() {
  return (
    <section className="bg-purple-600 min-h-screen p-10 text-black flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8 bg-white/30 backdrop-blur-xl rounded-xl shadow-lg">
    
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Free Tier</h2>
          <ul className="text-left list-disc list-inside text-gray-700 space-y-2">
            <li>Map access for tracking</li>
            <li>Drowsiness detection</li>
            <li>One week free trial</li>
          </ul>
          <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Start Free
          </button>
        </div>

   
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Pro</h2>
          <p className="text-xl font-bold text-gray-800 mb-4">$12<span className="text-sm font-normal">/month</span></p>
          <ul className="text-left list-disc list-inside text-gray-700 space-y-2">
            <li>Everything in Free Tier</li>
            <li>Priority support</li>
            <li>Real-time alerts</li>
          </ul>
          <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Go Pro
          </button>
        </div>

       
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Premium</h2>
          <p className="text-xl font-bold text-gray-800 mb-4">$25<span className="text-sm font-normal">/month</span></p>
          <ul className="text-start list-disc list-inside text-gray-700 space-y-2">
            <li>Everything in Pro Tier</li>
            <li>Advanced analytics</li>
            <li>Custom integrations</li>
          </ul>
          <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Get Premium
          </button>
        </div>
        
      </div>
    </section>
  );
}

export default Pricing_data;
