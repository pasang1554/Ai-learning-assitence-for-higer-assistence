import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icons = LucideIcons;
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button' }) => {
            const variants = {
                primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30',
                secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
                outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
                ghost: 'text-gray-600 hover:bg-gray-100',
                danger: 'bg-red-600 text-white hover:bg-red-700',
                success: 'bg-green-600 text-white hover:bg-green-700',
                accent: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30'
            };
            const sizes = {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-5 py-2.5 text-sm',
                lg: 'px-8 py-3.5 text-base',
                icon: 'p-2'
            };
            return (
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
                >
                    {children}
                </button>
            );
        };

        const Card = ({ children, className = '', hover = true }) => (
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${hover ? 'card-hover' : ''} ${className}`}>
                {children}
            </div>
        );

        const Badge = ({ children, variant = 'default', className = '' }) => {
            const variants = {
                default: 'bg-gray-100 text-gray-700',
                primary: 'bg-indigo-100 text-indigo-700',
                success: 'bg-green-100 text-green-700',
                warning: 'bg-amber-100 text-amber-700',
                danger: 'bg-red-100 text-red-700',
                info: 'bg-blue-100 text-blue-700'
            };
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
                    {children}
                </span>
            );
        };

        const ProgressBar = ({ value, max = 100, color = 'indigo', size = 'md', showLabel = true }) => {
            const percentage = Math.min(100, Math.max(0, (value / max) * 100));
            const colors = {
                indigo: 'bg-indigo-600',
                green: 'bg-green-500',
                amber: 'bg-amber-500',
                red: 'bg-red-500',
                blue: 'bg-blue-500',
                purple: 'bg-purple-500'
            };
            const sizes = {
                sm: 'h-1.5',
                md: 'h-2.5',
                lg: 'h-4'
            };
            return (
                <div className="w-full">
                    <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
                        <div
                            className={`${colors[color]} rounded-full transition-all duration-500 ${sizes[size]}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    {showLabel && (
                        <span className="text-xs text-gray-500 mt-1">{Math.round(percentage)}%</span>
                    )}
                </div>
            );
        };

        const Input = ({ label, type = 'text', placeholder, value, onChange, required, className = '', icon: Icon }) => (
            <div className={className}>
                {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
                <div className="relative">
                    {Icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Icon />
                        </div>
                    )}
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${Icon ? 'pl-10' : ''}`}
                    />
                </div>
            </div>
        );

        const Select = ({ label, value, onChange, options, required, className = '' }) => (
            <div className={className}>
                {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
                <select
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        );

        const Textarea = ({ label, value, onChange, placeholder, rows = 4, className = '' }) => (
            <div className={className}>
                {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                />
            </div>
        );

        const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
            if (!isOpen) return null;
            const sizes = {
                sm: 'max-w-md',
                md: 'max-w-lg',
                lg: 'max-w-2xl',
                xl: 'max-w-4xl',
                full: 'max-w-full'
            };
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
                    <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto fade-in`} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <Icons.X />
                            </button>
                        </div>
                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </div>
            );
        };

        const Toast = ({ message, type = 'info', onClose }) => {
            useEffect(() => {
                const timer = setTimeout(onClose, 3000);
                return () => clearTimeout(timer);
            }, [onClose]);
            const icons = { info: Icons.Info, success: Icons.CheckCircle, error: Icons.XCircle, warning: Icons.AlertCircle };
            const colors = { info: 'bg-blue-50 text-blue-800 border-blue-200', success: 'bg-green-50 text-green-800 border-green-200', error: 'bg-red-50 text-red-800 border-red-200', warning: 'bg-amber-50 text-amber-800 border-amber-200' };
            const Icon = icons[type];
            return (
                <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg fade-in ${colors[type]}`}>
                    <Icon />
                    <span className="text-sm font-medium">{message}</span>
                    <button onClick={onClose} className="ml-2"><Icons.X /></button>
                </div>
            );
        };
export { Icons, Button, Card, ProgressBar, Input, Select, Badge, Modal };
