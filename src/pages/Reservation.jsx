import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Upload, FileText, Check, ArrowLeft, ArrowRight, MapPin, Shield, X, CheckCircle2 } from 'lucide-react';
import { useReservations } from '../hooks/useReservations';
import { useCars } from '../hooks/useCars';
import { useAuth } from '../hooks/useAuth';

export default function Reservation() {
  const { id } = useParams();
  const { cars, loading } = useCars();
  const car = cars.find(c => String(c.id) === String(id));
  const { addReservation } = useReservations();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:00');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Voiture non trouvée</h2>
          <Link to="/cars" className="btn-primary">Retour aux voitures</Link>
        </div>
      </div>
    );
  }

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalPrice = days * car.price;

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addReservation({
        carId: car.id,
        carBrand: car.brand,
        carModel: car.model,
        carImage: car.image,
        startDate,
        endDate,
        totalPrice,
        status: 'confirmed',
        city: car.city,
        userEmail: user?.email || null,
        createdAt: new Date().toISOString(),
        documentName: file?.name || null,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      setSubmitError(error.message || "Une erreur est survenue lors de la réservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = startDate && endDate && days > 0;
  const canProceedStep2 = file !== null;
  const canSubmit = termsAccepted;

  const steps = [
    { num: 1, label: 'Dates', icon: <Calendar size={18} /> },
    { num: 2, label: 'Documents', icon: <Upload size={18} /> },
    { num: 3, label: 'Confirmation', icon: <Check size={18} /> },
  ];

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to={`/cars/${car.id}`} className="flex items-center gap-2 text-slate-400 hover:text-primary-400 text-sm transition-colors">
            <ArrowLeft size={16} />
            Retour aux détails
          </Link>
        </motion.div>

        {/* Car Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 !transform-none flex items-center gap-4 mb-8"
        >
          <img src={car.image} alt={car.brand} className="w-20 h-14 sm:w-28 sm:h-20 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-lg truncate">{car.brand} {car.model}</h2>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <span className="flex items-center gap-1"><MapPin size={13} /> {car.city}</span>
              <span>{car.year}</span>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xl font-bold gradient-text">{car.price} DZD</div>
            <div className="text-slate-500 text-xs">par jour</div>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 sm:gap-4 mb-10"
        >
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-4">
              <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                step === s.num
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  : step > s.num
                  ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                  : 'bg-white/5 text-slate-500 border border-white/8'
              }`}>
                {step > s.num ? <CheckCircle2 size={16} /> : s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-px transition-colors duration-300 ${step > s.num ? 'bg-green-500/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Dates */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card p-6 sm:p-8 !transform-none"
            >
              <h3 className="text-xl font-bold text-white mb-6">Choisissez vos dates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Date de début</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Heure de début</label>
                  <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input-field">
                    {Array.from({ length: 13 }, (_, i) => {
                      const h = (i + 8).toString().padStart(2, '0');
                      return <option key={h} value={`${h}:00`} className="bg-dark-800">{h}:00</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Date de fin</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Heure de fin</label>
                  <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input-field">
                    {Array.from({ length: 13 }, (_, i) => {
                      const h = (i + 8).toString().padStart(2, '0');
                      return <option key={h} value={`${h}:00`} className="bg-dark-800">{h}:00</option>;
                    })}
                  </select>
                </div>
              </div>

              {days > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-primary-500/8 border border-primary-500/15"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Durée: <strong className="text-white">{days} jour{days > 1 ? 's' : ''}</strong></span>
                    <span className="text-lg font-bold gradient-text">{totalPrice} DZD</span>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Docs */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card p-6 sm:p-8 !transform-none"
            >
              <h3 className="text-xl font-bold text-white mb-6">Permis de conduire</h3>
              <p className="text-slate-400 text-sm mb-6">Veuillez télécharger une copie de votre permis de conduire valide.</p>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-primary-400 bg-primary-500/10'
                    : file
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-white/10 hover:border-white/20 bg-white/2'
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/20 flex items-center justify-center">
                      <FileText size={24} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-slate-500 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <X size={14} />
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                      <Upload size={24} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Glissez votre fichier ici</p>
                      <p className="text-slate-500 text-sm">ou cliquez pour parcourir (JPG, PNG, PDF)</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="btn-secondary flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Précédent
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card p-6 sm:p-8 !transform-none"
            >
              <h3 className="text-xl font-bold text-white mb-6">Résumé de la réservation</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Véhicule</span>
                  <span className="text-white font-semibold">{car.brand} {car.model}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Lieu</span>
                  <span className="text-white font-semibold">{car.city}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Début</span>
                  <span className="text-white font-semibold">{new Date(startDate).toLocaleDateString('fr-FR')} à {startTime}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Fin</span>
                  <span className="text-white font-semibold">{new Date(endDate).toLocaleDateString('fr-FR')} à {endTime}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Durée</span>
                  <span className="text-white font-semibold">{days} jour{days > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Prix / jour</span>
                  <span className="text-white font-semibold">{car.price} DZD</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-slate-400">Document</span>
                  <span className="text-green-400 text-sm flex items-center gap-1"><Check size={14} /> {file?.name}</span>
                </div>
                <div className="flex items-center justify-between py-4 bg-primary-500/8 rounded-xl px-4 border border-primary-500/15">
                  <span className="text-white font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold gradient-text">{totalPrice} DZD</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 p-4 rounded-xl bg-white/3 border border-white/5">
                <Shield size={16} className="text-green-400 shrink-0" />
                <span className="text-slate-400 text-xs">Assurance tous risques, kilométrage illimité et assistance 24/7 inclus.</span>
              </div>

              <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                <div
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                    termsAccepted
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-white/20 group-hover:border-white/40'
                  }`}
                >
                  {termsAccepted && <Check size={14} className="text-white" />}
                </div>
                <span className="text-slate-400 text-sm">
                  J'accepte les <a href="#" className="text-primary-400 hover:underline">conditions générales</a> de location et la <a href="#" className="text-primary-400 hover:underline">politique de confidentialité</a>.
                </span>
              </label>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Précédent
                </button>
                <div className="flex flex-col items-end gap-2">
                  {submitError && (
                    <div className="text-red-400 text-sm font-medium bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 max-w-xs text-right">
                      {submitError}
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Confirmer la réservation
                      <Check size={16} />
                    </>
                  )}
                </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card p-8 sm:p-10 max-w-md w-full text-center !transform-none"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Réservation Confirmée !</h3>
                <p className="text-slate-400 mb-8">
                  Votre réservation de {car.brand} {car.model} a été confirmée avec succès. Vous recevrez un email de confirmation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => window.location.href = '/dashboard?tab=reservations'} 
                    className="btn-primary flex-1 text-center"
                  >
                    Mes Réservations
                  </button>
                  <Link to="/cars" className="btn-secondary flex-1 text-center">
                    Continuer
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
