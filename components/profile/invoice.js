'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  Loader2, FileText, Search, Calendar, Building,
  ArrowLeft, DollarSign, Clock, CheckCircle,
  Eye, Download, Filter, X, AlertCircle, AlertTriangle,
  Mail, CreditCard, RefreshCw, Receipt, Package,
  Home, ChevronLeft, ChevronRight, Printer,
  Wallet, CalendarDays, Hash, Info, TrendingUp,
  PieChart, Truck, Ship, Plane, HelpCircle
} from 'lucide-react';

// API Imports
import { 
  getInvoicesByCustomer,
  getInvoiceById,
  downloadInvoicePDF,
  formatCurrency,
  formatDate,
  getDaysUntilDue,
  getPaymentStatusDisplayText,
  getInvoiceStatusDisplayText
} from '@/Api/invoice';
import { getCurrentUser } from '@/Api/Authentication';

// ==================== CONSTANTS ====================

const INVOICE_STATUS = {
  draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-800', icon: FileText },
  sent: { label: 'Sent', bg: 'bg-blue-100', text: 'text-blue-800', icon: Mail },
  paid: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-800', icon: X }
};

const PAYMENT_STATUS = {
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  paid: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-800', icon: X }
};

// ==================== HELPER FUNCTIONS ====================

const getStatusInfo = (status, type = 'invoice') => {
  const statusMap = type === 'payment' ? PAYMENT_STATUS : INVOICE_STATUS;
  return statusMap[status] || {
    label: status || 'Unknown',
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: HelpCircle
  };
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ==================== COMPONENTS ====================

const StatCard = ({ title, value, icon: Icon, color = 'orange', subtitle }) => {
  const colorClasses = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status, type = 'invoice' }) => {
  const info = getStatusInfo(status, type);
  const Icon = info.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.bg} ${info.text}`}>
      <Icon className="h-3 w-3 mr-1" />
      {info.label}
    </span>
  );
};

const FilterBar = ({ filters, onFilterChange, onSearch, searchTerm, onRefresh, refreshing }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice number..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border rounded-lg hover:bg-gray-50 ${showFilters ? 'bg-orange-50 border-orange-200' : ''}`}
          >
            <Filter className="h-4 w-4 text-gray-600" />
          </button>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-2 border rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => onFilterChange('startDate', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => onFilterChange('endDate', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="-totalAmount">Highest Amount</option>
              <option value="totalAmount">Lowest Amount</option>
              <option value="dueDate">Due Date (Earliest)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

const InvoiceCard = ({ invoice, onView, onDownload }) => {
  const statusInfo = getStatusInfo(invoice.status);
  const paymentInfo = getStatusInfo(invoice.paymentStatus, 'payment');
  const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.paymentStatus !== 'paid';
  const daysUntilDue = getDaysUntilDue(invoice.dueDate);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-gray-900">{invoice.invoiceNumber}</span>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-orange-600">
              {formatCurrency(invoice.totalAmount, invoice.currency)}
            </p>
          </div>
          <StatusBadge status={invoice.paymentStatus} type="payment" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-gray-500 mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span className="text-xs">Issue Date</span>
            </div>
            <p className="font-medium">{formatDate(invoice.invoiceDate, 'short')}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-gray-500 mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">Due Date</span>
            </div>
            <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {formatDate(invoice.dueDate, 'short')}
            </p>
          </div>
        </div>

        {invoice.bookingNumber && (
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-blue-600 font-medium">Booking #</p>
            <p className="text-sm font-medium text-gray-900">{invoice.bookingNumber}</p>
          </div>
        )}

        {daysUntilDue !== null && daysUntilDue <= 7 && daysUntilDue > 0 && invoice.paymentStatus !== 'paid' && (
          <div className="bg-yellow-50 p-2 rounded-lg flex items-center text-yellow-700">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-xs">Due in {daysUntilDue} days</span>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2 pt-2 border-t">
          <button
            onClick={() => onView(invoice._id)}
            className="flex-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </button>
          <button
            onClick={() => onDownload(invoice._id)}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            title="Download PDF"
          >
            <Download className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const InvoiceDetailsModal = ({ isOpen, onClose, invoice, onDownload }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !invoice) return null;

  const statusInfo = getStatusInfo(invoice.status);
  const paymentInfo = getStatusInfo(invoice.paymentStatus, 'payment');
  const StatusIcon = statusInfo.icon;
  const PaymentIcon = paymentInfo.icon;
  const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.paymentStatus !== 'paid';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Receipt className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{invoice.invoiceNumber}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Created on {formatDateTime(invoice.createdAt)}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-4 mt-4">
            {['details', 'items', 'payment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Invoice Status</p>
                  <div className="flex items-center">
                    <StatusIcon className={`h-5 w-5 mr-2 ${statusInfo.text}`} />
                    <span className={`font-medium ${statusInfo.text}`}>{statusInfo.label}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                  <div className="flex items-center">
                    <PaymentIcon className={`h-5 w-5 mr-2 ${paymentInfo.text}`} />
                    <span className={`font-medium ${paymentInfo.text}`}>{paymentInfo.label}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Invoice Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Invoice Date</p>
                    <p className="font-medium">{formatDate(invoice.invoiceDate, 'long')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {formatDate(invoice.dueDate, 'long')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Currency</p>
                    <p className="font-medium">{invoice.currency || 'USD'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Terms</p>
                    <p className="font-medium">{invoice.paymentTerms || 'Due on receipt'}</p>
                  </div>
                </div>
              </div>

              {invoice.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-sm text-gray-600">{invoice.notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'items' && (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Quantity</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Unit Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoice.charges?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3">
                          <p className="font-medium">{item.description}</p>
                          <p className="text-xs text-gray-500">{item.type}</p>
                        </td>
                        <td className="px-4 py-3 text-right">1</td>
                        <td className="px-4 py-3 text-right">{formatCurrency(item.amount, invoice.currency)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.amount, invoice.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>
                  {invoice.discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-red-600">-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax ({invoice.taxRate || 0}%):</span>
                    <span>{formatCurrency(invoice.taxAmount || 0, invoice.currency)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-lg text-orange-600">
                        {formatCurrency(invoice.totalAmount, invoice.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && invoice.paymentStatus === 'paid' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center text-green-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-green-600">Payment Method</p>
                  <p className="font-medium text-green-700">{invoice.paymentMethod || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-green-600">Payment Date</p>
                  <p className="font-medium text-green-700">{formatDate(invoice.paymentDate, 'long')}</p>
                </div>
                {invoice.paymentReference && (
                  <div className="col-span-2">
                    <p className="text-xs text-green-600">Reference</p>
                    <p className="font-medium text-green-700">{invoice.paymentReference}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && invoice.paymentStatus !== 'paid' && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Payment not yet received</p>
              <p className="text-sm mt-1">Due date: {formatDate(invoice.dueDate, 'long')}</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex justify-between">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Close</button>
            <button
              onClick={() => { onDownload(invoice._id); onClose(); }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onRefresh }) => (
  <div className="text-center py-16 bg-white rounded-xl border">
    <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
      <Receipt className="h-10 w-10 text-orange-500" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
      You don't have any invoices yet. Invoices will appear here once they are created.
    </p>
    <button onClick={onRefresh} className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
      <RefreshCw className="h-4 w-4 mr-2" />
      Refresh
    </button>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="bg-white rounded-xl border p-4 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

// ==================== MAIN PAGE ====================

export default function MyInvoicesPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [apiError, setApiError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    paymentStatus: 'all',
    startDate: '',
    endDate: '',
    sort: '-createdAt'
  });

  // Get current user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('🔍 Loading current user...');
        const user = getCurrentUser();
        console.log('👤 Current User:', user);
        
        if (user && user._id) {
          setCurrentUser(user);
          await loadInvoices(user._id);
        } else {
          console.log('❌ No user found');
          toast.error('Please login to view invoices');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        toast.error('Failed to load user data');
      }
    };
    
    loadUser();
  }, []);

  const loadInvoices = async (customerId) => {
    if (!customerId) {
      console.log('❌ No customer ID');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setApiError(null);
    
    try {
      const params = {
        status: filters.status !== 'all' ? filters.status : undefined,
        paymentStatus: filters.paymentStatus !== 'all' ? filters.paymentStatus : undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        sort: filters.sort
      };
      
      console.log('📡 Fetching invoices for customer:', customerId);
      console.log('📡 With params:', params);
      
      const result = await getInvoicesByCustomer(customerId, params);
      
      console.log('📦 API Response:', result);
      
      if (result.success) {
        console.log(`✅ Found ${result.data?.length} invoices`);
        setInvoices(result.data || []);
        setSummary(result.summary);
        setPagination(result.pagination);
        
        if (result.data?.length === 0) {
          toast.info('No invoices found');
        } else {
          toast.success(`${result.data?.length} invoice(s) found`);
        }
      } else {
        console.error('❌ API Error:', result.message);
        setApiError(result.message);
        toast.error(result.message || 'Failed to load invoices');
        setInvoices([]);
      }
    } catch (error) {
      console.error('❌ Load invoices error:', error);
      setApiError(error.message);
      toast.error('Failed to load invoices');
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!currentUser?._id) return;
    setRefreshing(true);
    await loadInvoices(currentUser._id);
    setRefreshing(false);
  };

  // Apply filters
  useEffect(() => {
    if (!invoices.length) {
      setFilteredInvoices([]);
      return;
    }
    
    let filtered = [...invoices];

    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(inv => inv.status === filters.status);
    }

    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter(inv => inv.paymentStatus === filters.paymentStatus);
    }

    if (filters.startDate) {
      filtered = filtered.filter(inv => 
        new Date(inv.invoiceDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(inv => 
        new Date(inv.invoiceDate) <= new Date(filters.endDate)
      );
    }

    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'createdAt':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case '-createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'totalAmount':
          return (a.totalAmount || 0) - (b.totalAmount || 0);
        case '-totalAmount':
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return 0;
      }
    });

    setFilteredInvoices(filtered);
  }, [invoices, filters, searchTerm]);

  const handleViewInvoice = async (invoiceId) => {
    try {
      const result = await getInvoiceById(invoiceId);
      if (result.success) {
        setSelectedInvoice(result.data);
        setShowDetailsModal(true);
      } else {
        toast.error(result.message || 'Failed to load invoice details');
      }
    } catch (error) {
      toast.error('Failed to load invoice details');
    }
  };

  const handleDownloadPDF = async (invoiceId) => {
    const toastId = toast.loading('Generating PDF...');
    try {
      const result = await downloadInvoicePDF(invoiceId);
      toast.dismiss(toastId);
      if (result.success) {
        toast.success('PDF downloaded successfully');
      } else {
        toast.error(result.message || 'Failed to download PDF');
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to download PDF');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getSummaryStats = () => {
    const totalInvoices = filteredInvoices.length;
    const paidInvoices = filteredInvoices.filter(inv => inv.paymentStatus === 'paid').length;
    const pendingInvoices = filteredInvoices.filter(inv => inv.paymentStatus === 'pending').length;
    const overdueInvoices = filteredInvoices.filter(inv => inv.paymentStatus === 'overdue').length;
    
    const totalAmount = filteredInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const paidAmount = filteredInvoices
      .filter(inv => inv.paymentStatus === 'paid')
      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const pendingAmount = filteredInvoices
      .filter(inv => inv.paymentStatus === 'pending')
      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

    return { totalInvoices, paidInvoices, pendingInvoices, overdueInvoices, totalAmount, paidAmount, pendingAmount };
  };

  const stats = getSummaryStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading your invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/customer/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                  <Receipt className="h-6 w-6 mr-2 text-orange-500" />
                  My Invoices
                </h1>
                <p className="text-sm text-gray-500">View and download your invoices</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/customer/dashboard" className="p-2 hover:bg-gray-100 rounded-lg border" title="Dashboard">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">Error loading invoices</p>
                <p className="text-sm text-red-600 mt-1">{apiError}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !apiError && filteredInvoices.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <StatCard title="Total Invoices" value={stats.totalInvoices} icon={Receipt} color="blue" subtitle={`Total: ${formatCurrency(stats.totalAmount)}`} />
            <StatCard title="Paid" value={stats.paidInvoices} icon={CheckCircle} color="green" subtitle={`Amount: ${formatCurrency(stats.paidAmount)}`} />
            <StatCard title="Pending" value={stats.pendingInvoices} icon={Clock} color="yellow" subtitle={`Amount: ${formatCurrency(stats.pendingAmount)}`} />
            <StatCard title="Overdue" value={stats.overdueInvoices} icon={AlertCircle} color="red" />
          </div>
        )}

        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onSearch={setSearchTerm} 
          searchTerm={searchTerm} 
          onRefresh={handleRefresh} 
          refreshing={refreshing} 
        />

        {!loading && !apiError && filteredInvoices.length > 0 && (
          <p className="text-sm text-gray-500 mb-3">
            Showing {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}

        {!loading && !apiError && filteredInvoices.length === 0 && invoices.length === 0 && (
          <EmptyState onRefresh={handleRefresh} />
        )}

        {!loading && !apiError && filteredInvoices.length === 0 && invoices.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No invoices match your filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilters({ status: 'all', paymentStatus: 'all', startDate: '', endDate: '', sort: '-createdAt' });
              }}
              className="mt-2 text-orange-500 hover:text-orange-600 underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !apiError && filteredInvoices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard 
                key={invoice._id} 
                invoice={invoice} 
                onView={handleViewInvoice} 
                onDownload={handleDownloadPDF} 
              />
            ))}
          </div>
        )}
      </div>

      <InvoiceDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => { 
          setShowDetailsModal(false); 
          setSelectedInvoice(null); 
        }} 
        invoice={selectedInvoice} 
        onDownload={handleDownloadPDF} 
      />
    </div>
  );
}