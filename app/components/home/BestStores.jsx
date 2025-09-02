"use client";
import { useState, useEffect } from "react";
import { FiStar, FiUsers, FiExternalLink } from "react-icons/fi";
import { getApiUrl } from '../../utils/api';

export default function BestStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl('/Store/GetAllStores'));
        if (!response.ok) {
          throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        // Get top 6 stores for display
        setStores(data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            أفضل المتاجر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            أفضل المتاجر
          </h2>
          <div className="text-center text-red-500">
            خطأ في تحميل المتاجر: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          أفضل المتاجر
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#14b8a6] to-[#0891b2] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {store.name?.charAt(0) || 'S'}
                </div>
                <div className="mr-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {store.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <FiStar className="fill-current" />
                    <span className="mr-1 text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {store.description || 'متجر رائع يقدم أفضل العروض والخصومات'}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-500 text-sm">
                  <FiUsers className="ml-1" />
                  <span>1.2k متابع</span>
                </div>
                <button className="bg-[#14b8a6] text-white px-4 py-2 rounded-lg hover:bg-[#0f9488] transition-colors flex items-center text-sm">
                  زيارة المتجر
                  <FiExternalLink className="mr-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}