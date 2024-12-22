import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, Loader2, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

export const ApplicationStatus = () => {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setStatus(null);

    try {
      const q = query(
        collection(db, 'applications'),
        where('applicationNumber', '==', applicationNumber.toUpperCase())
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Başvuru bulunamadı. Lütfen başvuru numaranızı kontrol edin.');
      } else {
        setStatus(querySnapshot.docs[0].data());
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'İşleme Alındı';
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="p-8 space-y-6">
        <div className="text-center">
          <Search className="w-12 h-12 text-[#ffb700] mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Başvuru Sorgula
          </h2>
          <p className="mt-2 text-gray-600">
            Başvuru numaranız ile başvurunuzun durumunu kontrol edin
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Başvuru Numarası
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#ffb700] focus:ring-2 focus:ring-[#ffb700] focus:ring-opacity-50 transition-colors"
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value.toUpperCase())}
              placeholder="Örn: ABC123"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !applicationNumber}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#ffb700] text-white rounded-lg font-medium hover:bg-[#e5a600] focus:outline-none focus:ring-2 focus:ring-[#ffb700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Sorgula</span>
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-lg bg-red-50 flex items-start space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 border-t border-gray-200 pt-6"
            >
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Başvuru Durumu</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.status)}
                    <span className="text-lg font-medium">{getStatusText(status.status)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">İsim</p>
                  <p className="mt-1 font-medium">{status.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Başvuru Tarihi</p>
                  <p className="mt-1 font-medium">{status.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marka</p>
                  <p className="mt-1 font-medium">{status.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kategori</p>
                  <p className="mt-1 font-medium">{status.category}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};