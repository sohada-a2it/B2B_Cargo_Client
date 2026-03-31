// app/customer/invoices/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  getInvoicesByCustomer,
  getInvoiceById,
  formatCurrency,
  formatDate,
  getDaysUntilDue,
} from '@/Api/invoice';
import { getCurrentUser } from '@/Api/Authentication';
import { toast } from 'react-toastify';
import {
  Loader2, Search, Calendar, Building,
  ArrowLeft, Clock, CheckCircle,
  Eye, Filter, Download, X, AlertCircle, AlertTriangle,
  FileText, RefreshCw, Receipt, Package,
  Home, Ban, Send
} from 'lucide-react';

// ==================== PDF IMPORTS & FUNCTIONS ====================
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

// PDF Styles
Font.register({
  family: 'Helvetica',
  src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf'
});

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, borderBottom: '2px solid #E67E22', paddingBottom: 20 },
  companySection: { flex: 1 },
  companyName: { fontSize: 24, fontWeight: 'bold', color: '#E67E22', marginBottom: 5 },
  companyAddress: { fontSize: 9, color: '#4B5563', marginBottom: 2 },
  invoiceSection: { flex: 1, alignItems: 'flex-end' },
  invoiceTitle: { fontSize: 28, fontWeight: 'bold', color: '#E67E22', marginBottom: 10 },
  invoiceDetails: { fontSize: 10, color: '#4B5563', textAlign: 'right' },
  status: { padding: 8, borderRadius: 4, marginBottom: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 12 },
  statusPaid: { backgroundColor: '#D1FAE5', color: '#065F46' },
  statusPending: { backgroundColor: '#FEF3C7', color: '#92400E' },
  statusOverdue: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  statusDraft: { backgroundColor: '#F3F4F6', color: '#374151' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, backgroundColor: '#F97316', color: 'white', padding: 6, borderRadius: 4 },
  row: { flexDirection: 'row', marginBottom: 6, paddingHorizontal: 4 },
  label: { fontWeight: 'bold', width: '30%', fontSize: 9, color: '#374151' },
  value: { width: '70%', fontSize: 9, color: '#1F2937' },
  table: { marginTop: 10, marginBottom: 20 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#F3F4F6', padding: 8, fontWeight: 'bold', fontSize: 9, borderBottom: '1px solid #E5E7EB' },
  tableRow: { flexDirection: 'row', padding: 8, borderBottom: '1px solid #F3F4F6' },
  col1: { width: '45%', fontSize: 9 },
  col2: { width: '20%', fontSize: 9, textAlign: 'center' },
  col3: { width: '20%', fontSize: 9, textAlign: 'right' },
  col4: { width: '15%', fontSize: 9, textAlign: 'right' },
  totalSection: { marginTop: 20, alignItems: 'flex-end', borderTop: '1px solid #E5E7EB', paddingTop: 15 },
  totalRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 6, width: '50%' },
  totalLabel: { fontSize: 10, fontWeight: 'bold', width: '40%', textAlign: 'right', paddingRight: 10 },
  totalValue: { fontSize: 10, width: '60%', textAlign: 'right' },
  grandTotalRow: { marginTop: 5, borderTop: '1px solid #E67E22', paddingTop: 8 },
  grandTotalLabel: { fontSize: 14, fontWeight: 'bold', color: '#E67E22' },
  grandTotalValue: { fontSize: 14, fontWeight: 'bold', color: '#E67E22' },
  paymentInfo: { marginTop: 20, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 4 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#9CA3AF', borderTop: '1px solid #E5E7EB', paddingTop: 10 },
  thankYou: { fontSize: 10, fontWeight: 'bold', color: '#E67E22', marginBottom: 4 }
});

// PDF Helper Functions
const formatCurrencyPDF = (amount, currency = 'USD') => {
  if (!amount && amount !== 0) return 'N/A';
  const symbols = { USD: '$', EUR: '€', GBP: '£', BDT: '৳', INR: '₹' };
  return `${symbols[currency] || '$'}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
};

const formatDatePDF = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getStatusStylePDF = (paymentStatus) => {
  switch (paymentStatus) {
    case 'paid': return pdfStyles.statusPaid;
    case 'pending': return pdfStyles.statusPending;
    case 'overdue': return pdfStyles.statusOverdue;
    default: return pdfStyles.statusDraft;
  }
};

const getStatusTextPDF = (paymentStatus) => {
  switch (paymentStatus) {
    case 'paid': return '✓ PAID';
    case 'pending': return '⏳ PENDING';
    case 'overdue': return '⚠️ OVERDUE';
    default: return '📄 DRAFT';
  }
};

// PDF Component
const InvoicePDF = ({ invoice, companyInfo }) => {
  const defaultCompany = {
    name: 'B2B Logistics Group',
    address: '123 Business Avenue, Commercial Area',
    city: 'Dhaka, Bangladesh 1212',
    phone: '+880 1234-567890',
    email: 'info@b2blogistics.com'
  };
  const info = companyInfo || defaultCompany;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <View style={pdfStyles.companySection}>
            <Text style={pdfStyles.companyName}>{info.name}</Text>
            <Text style={pdfStyles.companyAddress}>{info.address}</Text>
            <Text style={pdfStyles.companyAddress}>{info.city}</Text>
            <Text style={pdfStyles.companyAddress}>Phone: {info.phone}</Text>
            <Text style={pdfStyles.companyAddress}>Email: {info.email}</Text>
          </View>
          <View style={pdfStyles.invoiceSection}>
            <Text style={pdfStyles.invoiceTitle}>INVOICE</Text>
            <Text style={pdfStyles.invoiceDetails}>#{invoice.invoiceNumber}</Text>
            <Text style={pdfStyles.invoiceDetails}>Date: {formatDatePDF(invoice.invoiceDate)}</Text>
            <Text style={pdfStyles.invoiceDetails}>Due Date: {formatDatePDF(invoice.dueDate)}</Text>
          </View>
        </View>

        <View style={[pdfStyles.status, getStatusStylePDF(invoice.paymentStatus)]}>
          <Text>{getStatusTextPDF(invoice.paymentStatus)}</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>BILL TO</Text>
          <View style={pdfStyles.row}><Text style={pdfStyles.label}>Company:</Text><Text style={pdfStyles.value}>{invoice.customerInfo?.companyName || 'N/A'}</Text></View>
          <View style={pdfStyles.row}><Text style={pdfStyles.label}>Contact:</Text><Text style={pdfStyles.value}>{invoice.customerInfo?.contactPerson || 'N/A'}</Text></View>
          <View style={pdfStyles.row}><Text style={pdfStyles.label}>Email:</Text><Text style={pdfStyles.value}>{invoice.customerInfo?.email || 'N/A'}</Text></View>
          <View style={pdfStyles.row}><Text style={pdfStyles.label}>Phone:</Text><Text style={pdfStyles.value}>{invoice.customerInfo?.phone || 'N/A'}</Text></View>
          <View style={pdfStyles.row}><Text style={pdfStyles.label}>Address:</Text><Text style={pdfStyles.value}>{invoice.customerInfo?.address || 'N/A'}</Text></View>
        </View>

        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={pdfStyles.col1}>Description</Text>
            <Text style={pdfStyles.col2}>Type</Text>
            <Text style={pdfStyles.col3}>Amount</Text>
            <Text style={pdfStyles.col4}>Currency</Text>
          </View>
          {invoice.charges && invoice.charges.length > 0 ? (
            invoice.charges.map((charge, idx) => (
              <View key={idx} style={pdfStyles.tableRow}>
                <Text style={pdfStyles.col1}>{charge.description}</Text>
                <Text style={pdfStyles.col2}>{charge.type}</Text>
                <Text style={pdfStyles.col3}>{formatCurrencyPDF(charge.amount, charge.currency)}</Text>
                <Text style={pdfStyles.col4}>{charge.currency}</Text>
              </View>
            ))
          ) : (
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.col1}>No charges specified</Text>
              <Text style={pdfStyles.col2}>-</Text>
              <Text style={pdfStyles.col3}>-</Text>
              <Text style={pdfStyles.col4}>-</Text>
            </View>
          )}
        </View>

        <View style={pdfStyles.totalSection}>
          <View style={pdfStyles.totalRow}><Text style={pdfStyles.totalLabel}>Subtotal:</Text><Text style={pdfStyles.totalValue}>{formatCurrencyPDF(invoice.subtotal, invoice.currency)}</Text></View>
          <View style={pdfStyles.totalRow}><Text style={pdfStyles.totalLabel}>Tax ({invoice.taxRate || 0}%):</Text><Text style={pdfStyles.totalValue}>{formatCurrencyPDF(invoice.taxAmount, invoice.currency)}</Text></View>
          {invoice.discountAmount > 0 && <View style={pdfStyles.totalRow}><Text style={pdfStyles.totalLabel}>Discount:</Text><Text style={pdfStyles.totalValue}>-{formatCurrencyPDF(invoice.discountAmount, invoice.currency)}</Text></View>}
          <View style={[pdfStyles.totalRow, pdfStyles.grandTotalRow]}><Text style={[pdfStyles.totalLabel, pdfStyles.grandTotalLabel]}>TOTAL:</Text><Text style={[pdfStyles.totalValue, pdfStyles.grandTotalValue]}>{formatCurrencyPDF(invoice.totalAmount, invoice.currency)}</Text></View>
        </View>

        {invoice.paymentStatus === 'paid' && (
          <View style={pdfStyles.paymentInfo}>
            <Text style={pdfStyles.sectionTitle}>PAYMENT INFORMATION</Text>
            <View style={pdfStyles.row}><Text style={pdfStyles.label}>Method:</Text><Text style={pdfStyles.value}>{invoice.paymentMethod || 'N/A'}</Text></View>
            <View style={pdfStyles.row}><Text style={pdfStyles.label}>Date:</Text><Text style={pdfStyles.value}>{formatDatePDF(invoice.paymentDate)}</Text></View>
          </View>
        )}

        {invoice.notes && <View style={pdfStyles.section}><Text style={pdfStyles.sectionTitle}>NOTES</Text><Text style={{ fontSize: 8 }}>{invoice.notes}</Text></View>}
        
        <View style={pdfStyles.footer}>
          <Text style={pdfStyles.thankYou}>Thank you for your business!</Text>
          <Text>For inquiries: {info.email} | {info.phone}</Text>
        </View>
      </Page>
    </Document>
  );
};

const COMPANY_INFO = {
  name: 'B2B Logistics Group',
  address: '123 Business Avenue, Commercial Area',
  city: 'Dhaka, Bangladesh 1212',
  phone: '+880 1234-567890',
  email: 'info@b2blogistics.com'
};
 

// ==================== CONSTANTS ====================

const INVOICE_STATUS = {
  draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-800', icon: FileText },
  sent: { label: 'Sent', bg: 'bg-blue-100', text: 'text-blue-800', icon: Send },
  paid: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-800', icon: Ban }
};

const PAYMENT_STATUS = {
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  paid: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-800', icon: Ban }
};

// ==================== HELPER FUNCTIONS ====================

const getStatusInfo = (status, type = 'invoice') => {
  const statusMap = type === 'payment' ? PAYMENT_STATUS : INVOICE_STATUS;
  return statusMap[status] || {
    label: status || 'Unknown',
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: FileText
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

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color = 'orange', subtitle }) => {
  const colorClasses = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
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

// Status Badge Component
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

// Filter Bar Component
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
          {/* <select
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
          </select> */}

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
              {/* <option value="dueDate">Due Date (Earliest)</option> */}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Invoice Card Component
const InvoiceCard = ({ invoice, onView, onDownload }) => {
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
          {/* <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center text-gray-500 mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">Due Date</span>
            </div>
            <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {formatDate(invoice.dueDate, 'short')}
            </p>
          </div> */}
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

// Invoice Table Row Component
const InvoiceTableRow = ({ invoice, onView, onDownload }) => {
  const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.paymentStatus !== 'paid';
  const daysUntilDue = getDaysUntilDue(invoice.dueDate);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <Receipt className="h-4 w-4 text-[#E67E22]" />
          <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-[#E67E22]">
              {invoice.customerInfo?.companyName?.charAt(0) || 'C'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{invoice.customerInfo?.companyName || 'N/A'}</p>
            <p className="text-xs text-gray-500">{invoice.customerInfo?.contactPerson || ''}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          {formatDate(invoice.invoiceDate, 'short')}
        </div>
      </td>
      {/* <td className="px-4 py-3 text-sm">
        <div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              {formatDate(invoice.dueDate, 'short')}
            </span>
          </div>
          {daysUntilDue !== null && daysUntilDue <= 7 && invoice.paymentStatus !== 'paid' && (
            <p className="text-xs text-red-500 mt-1">Due in {daysUntilDue} days</p>
          )}
        </div>
      </td> */}
      <td className="px-4 py-3 text-sm font-medium text-right">
        <span className="font-bold text-[#E67E22]">
          {formatCurrency(invoice.totalAmount, invoice.currency)}
        </span>
      </td>
      {/* <td className="px-4 py-3">
        <StatusBadge status={invoice.status} />
      </td> */}
      {/* <td className="px-4 py-3">
        <StatusBadge status={invoice.paymentStatus} type="payment" />
      </td> */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end space-x-1">
          <button
            onClick={() => onView(invoice._id)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
            title="View"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDownload(invoice._id)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
            title="Download PDF"
          >
            <FileText className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Invoice Details Modal
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
            {['details', 'items'].map((tab) => (
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
              {/* <div className="grid grid-cols-2 gap-4">
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
              </div> */}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Invoice Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Invoice Date</p>
                    <p className="font-medium">{formatDate(invoice.invoiceDate, 'long')}</p>
                  </div>
                  {/* <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {formatDate(invoice.dueDate, 'long')}
                    </p>
                  </div> */}
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

          {/* {activeTab === 'payment' && invoice.paymentStatus !== 'paid' && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Payment not yet received</p>
              <p className="text-sm mt-1">Due date: {formatDate(invoice.dueDate, 'long')}</p>
            </div>
          )} */}
        </div>

        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex justify-between">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Close</button>
            <button
              onClick={() => { onDownload(invoice._id); }}
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

// Empty State Component
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

// ==================== MAIN PAGE ====================

export default function MyInvoicesPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  
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
        const user = getCurrentUser();
        
        if (user && user._id) {
          setCurrentUser(user);
          await loadInvoices(user._id);
        } else {
          toast.error('Please login to view invoices');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        toast.error('Failed to load user data');
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const loadInvoices = async (customerId) => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setApiError(null);
    
    try {
      const result = await getInvoicesByCustomer(customerId);
      
      if (result.success) {
        const data = result.data || [];
        setInvoices(data);
        
        // Calculate stats
        const totalInvoices = data.length;
        const totalAmount = data.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
        const paidInvoices = data.filter(inv => inv.paymentStatus === 'paid').length;
        const pendingInvoices = data.filter(inv => inv.paymentStatus === 'pending').length;
        const overdueInvoices = data.filter(inv => inv.paymentStatus === 'overdue').length;
        const paidAmount = data.filter(inv => inv.paymentStatus === 'paid').reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
        const pendingAmount = data.filter(inv => inv.paymentStatus === 'pending').reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
        
        setStats({
          totalInvoices,
          totalAmount,
          paidInvoices,
          pendingInvoices,
          overdueInvoices,
          paidAmount,
          pendingAmount
        });
        
        if (data.length === 0) {
          toast.info('No invoices found');
        }
      } else {
        setApiError(result.message);
        toast.error(result.message || 'Failed to load invoices');
        setInvoices([]);
      }
    } catch (error) {
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

  // PDF Download Handler - admin পেজের মতো সরাসরি ডাউনলোড, কোনো loading মেসেজ ছাড়া
// PDF Download Handler - ফোর্সড ডাউনলোড সহ
const handlePDFDownload = async (invoiceId) => {
  try {
    console.log('1. Starting PDF download for invoice:', invoiceId);
    
    const result = await getInvoiceById(invoiceId);
    console.log('2. API Response:', result);
    
    if (result.success && result.data) {
      const invoiceData = result.data;
      console.log('3. Invoice number:', invoiceData.invoiceNumber);
      
      if (!invoiceData.charges) {
        invoiceData.charges = [];
      }
      
      console.log('4. Generating PDF...');
      const blob = await pdf(<InvoicePDF invoice={invoiceData} companyInfo={COMPANY_INFO} />).toBlob();
      console.log('5. PDF blob created, size:', blob.size);
      
      // বিকল্প 1: createObjectURL ব্যবহার করে
      const url = URL.createObjectURL(blob);
      
      // বিকল্প 2: window.open দিয়ে খোলা (পপ-আপ ব্লকার এড়ানোর জন্য)
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
      downloadLink.target = '_blank';
      
      // Force download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // ক্লিনআপ
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('6. PDF download triggered');
      toast.success('PDF downloaded successfully');
      
      // বিকল্প 3: window.open সরাসরি (যদি উপরের না কাজ করে)
      // window.open(url, '_blank');
      
    } else {
      console.error('No data in response:', result);
      toast.error('Failed to fetch invoice data');
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    toast.error('Failed to generate PDF: ' + error.message);
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

  const displayStats = getSummaryStats();

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
            <StatCard title="Total Invoices" value={displayStats.totalInvoices} icon={Receipt} color="blue" subtitle={`Total: ${formatCurrency(displayStats.totalAmount)}`} />
            {/* <StatCard title="Paid" value={displayStats.paidInvoices} icon={CheckCircle} color="green" subtitle={`Amount: ${formatCurrency(displayStats.paidAmount)}`} />
            <StatCard title="Pending" value={displayStats.pendingInvoices} icon={Clock} color="yellow" subtitle={`Amount: ${formatCurrency(displayStats.pendingAmount)}`} />
            <StatCard title="Overdue" value={displayStats.overdueInvoices} icon={AlertCircle} color="red" /> */}
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

        {!loading && !apiError && filteredInvoices.length > 0 && viewMode === 'table' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th> */}
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th> */}
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th> */}
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredInvoices.map((invoice) => (
                    <InvoiceTableRow
                      key={invoice._id}
                      invoice={invoice}
                      onView={handleViewInvoice}
                      onDownload={handlePDFDownload}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !apiError && filteredInvoices.length > 0 && viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard 
                key={invoice._id} 
                invoice={invoice} 
                onView={handleViewInvoice} 
                onDownload={handlePDFDownload} 
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
        onDownload={handlePDFDownload} 
      />
    </div>
  );
}