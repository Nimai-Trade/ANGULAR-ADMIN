import { environment } from './environment';
export const URLS = Object();
//URLS.sendActivationLink = 'http://136.232.244.190:8081/nimaiEmail/sendAdminSetPasswordLink';
URLS.sendActivationLink = 'https://uat.360tf.trade/nimaiEmail/sendAdminSetPasswordLink';

//URLS.sendActivationLink = 'http://203.115.123.93:8080/nimaiEmail/sendAdminSetPasswordLink';
//URLS.sendActivationLink = 'https://prod.360tf.trade/nimaiEmail/sendAdminSetPasswordLink';
//URLS.sendActivationLink = 'http://nimai-pilot-lb-468660897.me-south-1.elb.amazonaws.com/nimaiEmail/sendAdminSetPasswordLink';
//URLS.sendActivationLink = 'https://uat.nimaitrade.com/nimaiEmail/sendAdminSetPasswordLink';
//BASE_API_URL: 'https://uat.nimaitrade.com/nimaiAdminApiUat/nimaiEmail/sendAdminSetPasswordLink'
URLS.postLoginUrl = environment.BASE_API_URL + 'api/auth/signin';
URLS.validateUser = environment.BASE_API_URL + 'api/auth/validateUser';
URLS.postUserRightsUrl = environment.BASE_API_URL + 'api/auth/userRights';
URLS.postFirsttimeChangePasswordUrl = environment.BASE_API_URL + 'api/auth/changePassword';
URLS.postForgotPasswordUrl = environment.BASE_API_URL + 'api/auth/forgotPassword';
URLS.getEmployeeListUrl = environment.BASE_API_URL + 'api/employee/list';
URLS.postSaveEmployeeUrl = environment.BASE_API_URL + 'api/employee/save';
URLS.getEmployeeDetailsUrl = environment.BASE_API_URL + 'api/employee/';
URLS.getUpdateEmployeeStatusUrl = environment.BASE_API_URL + 'api/employee/updateEmployeeStatus';
URLS.getCheckEmployeeCodeUrl = environment.BASE_API_URL + 'api/employee/checkEmployeeCode/';
URLS.getEmployeeGrantListUrl = environment.BASE_API_URL + 'api/employee/approvalPendingList';

URLS.getRoleListUrl = environment.BASE_API_URL + 'api/role/list';
URLS.postSaveRoleUrl = environment.BASE_API_URL + 'api/role/save';
URLS.getRoleDetailsUrl = environment.BASE_API_URL + 'api/role/';
URLS.getUpdateRoleStatusUrl = environment.BASE_API_URL + 'api/role/updateRoleStatus';
URLS.getCheckExistingRoleUrl = environment.BASE_API_URL + 'api/role/checkShortName/';

URLS.getRightListUrl = environment.BASE_API_URL + 'api/rights/list';
URLS.postSaveRightUrl = environment.BASE_API_URL + 'api/rights/save';
URLS.getRightDetailsUrl = environment.BASE_API_URL + 'api/rights/';
URLS.getUpdateRightStatusUrl = environment.BASE_API_URL + 'api/rights/updateRightStatus';
URLS.getCheckExistingRightUrl = environment.BASE_API_URL + 'api/rights/checkShortName/';

URLS.getRoleRightsMappingListUrl = environment.BASE_API_URL + 'api/roleRightsMapping/list';
URLS.getRolRightDetailsUrl = environment.BASE_API_URL + 'api/roleRightsMapping/';
URLS.getRoleDataList = environment.BASE_API_URL + 'api/roleRightsMapping/getRoleList';
URLS.getRightsDataList = environment.BASE_API_URL + 'api/roleRightsMapping/getRightsList';
URLS.getRightsDataById = environment.BASE_API_URL + 'api/roleRightsMapping/rightsList/';
URLS.saveRightsMapping = environment.BASE_API_URL + 'api/roleRightsMapping/saveMaping';

URLS.getCountryList = environment.BASE_API_URL + 'api/employee/countryList';

URLS.getAssignRmListUrl = environment.BASE_API_URL + 'api/customer/list';
URLS.updateRelationshipManagerUrl = environment.BASE_API_URL + 'api/customer/updateRelationshipManager';
URLS.getRmListUrl = environment.BASE_API_URL + 'api/customer/getRmList';

URLS.getTransactionUserIdSearchUrl = environment.BASE_API_URL + 'api/transaction/userIdSearch/';
URLS.getTransactionEmailIdSearchUrl = environment.BASE_API_URL + 'api/transaction/emailIdSearch/';
URLS.getTransactionMobileNumberSearchUrl = environment.BASE_API_URL + 'api/transaction/mobileNumberSearch/';
URLS.getTransactionCompanyNameSearchUrl = environment.BASE_API_URL + 'api/transaction/companyNameSearch/';
URLS.getTransactionCountrySearchUrl = environment.BASE_API_URL + 'api/transaction/countrySearch/';
URLS.getTransactionSearchListUrl = environment.BASE_API_URL + 'api/transaction/list';
URLS.getTransactionDetailsUrl = environment.BASE_API_URL + 'api/transaction/details/';
URLS.getQuotationListUrl = environment.BASE_API_URL + 'api/transaction/quotesList';
URLS.getQuotationDetailsUrl = environment.BASE_API_URL + 'api/transaction/quotes/';

URLS.getSearchCustomerListUrl = environment.BASE_API_URL + 'api/customer/searchCustomerList';
URLS.getCustomerDetailsUrl = environment.BASE_API_URL + 'api/bank/details/';


URLS.getBankSearchListUrl = environment.BASE_API_URL + 'api/bank/searchList';
URLS.getBankDetailsUrl = environment.BASE_API_URL + 'api/bank/details/';
URLS.getPlanOfPaymentDetailsUrl = environment.BASE_API_URL + 'api/bank/planOfPayment/';
URLS.getCustomerKycDetailsUrl = environment.BASE_API_URL + 'api/bank/kyc/';

URLS.getVasMakerListUrl = environment.BASE_API_URL + 'api/vas/getVasList';
URLS.postSaveVasDetailsUrl = environment.BASE_API_URL + 'api/vas/planSave';
URLS.getVasCheckerPendingListUrl = environment.BASE_API_URL + 'api/vas/getVasList';
URLS.getVasCheckerApproveListUrl = environment.BASE_API_URL + 'api/vas/getVasList';
URLS.getVasDetailsByIdUrl = environment.BASE_API_URL + 'api/vas/';
URLS.getVasApproveRejectUrl = environment.BASE_API_URL + 'api/vas/checkerUpdate';


URLS.getSubscriptionListUrl = environment.BASE_API_URL + 'api/subscription/list';
URLS.getSubscriptionDetailsByIdUrl = environment.BASE_API_URL + 'api/subscription/';
URLS.getSaveSubscriptionDetails = environment.BASE_API_URL + 'api/subscription/save';
URLS.getActionSubscriptionDetails = environment.BASE_API_URL + 'api/subscription/action';



URLS.postKycStatusUpdate = environment.BASE_API_URL + 'api/bank/kycStatusUpdate';
URLS.viewMakerApprovedKycByKycIdUrl = environment.BASE_API_URL + 'api/bank/viewMakerApprovedKycByKycId';
URLS.postMakerKycStatusUpdate = environment.BASE_API_URL + 'api/bank/makerKycStatusUpdate';
URLS.getQuoteListUrl = environment.BASE_API_URL + 'api/bank/quoteList';
URLS.getGrantKycListUrl = environment.BASE_API_URL + 'api/bank/makerApprovedKyc';

URLS.getUserIdSearchUrl = environment.BASE_API_URL + 'api/referer/userIdSearch/';
URLS.getEmailIdSearchUrl = environment.BASE_API_URL + 'api/referer/emailIdSearch/';
URLS.getMobileNumberSearchUrl = environment.BASE_API_URL + 'api/referer/mobileNumberSearch/';
URLS.getCompanyNameSearchUrl = environment.BASE_API_URL + 'api/referer/companyNameSearch/';
URLS.getBankNameSearchUrl = environment.BASE_API_URL + 'api/referer/bankNameSearch/';
URLS.getReferrerListUrl = environment.BASE_API_URL + 'api/referer/list';
URLS.getReferrerReferListUrl = environment.BASE_API_URL + 'api/referer/referList';
URLS.getRefererDetailsUrl = environment.BASE_API_URL + 'api/referer/';

URLS.postDisplayFeatureUpload = environment.BASE_API_URL + 'api/displayFeature/upload';
URLS.getDisplayFeatureDownload = environment.BASE_API_URL + 'api/displayFeature/download';
URLS.getDisplayFeatureDetails = environment.BASE_API_URL + 'api/displayFeature/list';

URLS.getCouponListUrl = environment.BASE_API_URL + 'api/discount/allCoupon';
URLS.getActiveCouponListUrl = environment.BASE_API_URL + 'api/discount/activeCoupons/list';
URLS.getInactiveCouponListUrl = environment.BASE_API_URL + 'api/discount/inactiveCoupons/list';
URLS.getPendingCouponListUrl = environment.BASE_API_URL + 'api/discount/pendingCoupons/list';
URLS.getExpiredCouponsListUrl = environment.BASE_API_URL + 'api/discount/expiredCoupons/list';
URLS.getRejectedCouponsListUrl = environment.BASE_API_URL + 'api/discount/rejectedCoupons/list';
URLS.postSaveCouponUrl = environment.BASE_API_URL + 'api/discount/save';
URLS.getCouponDetailsUrl = environment.BASE_API_URL + 'api/discount/discountId/'
URLS.getUpdateCouponStatusUrl = environment.BASE_API_URL + 'api/discount/deactivate';
URLS.getStatusUrl = environment.BASE_API_URL + 'api/discount/action';
URLS.getplanNameUrl = environment.BASE_API_URL + 'api/discount/fetch/planName';
URLS.getExcelUrl = environment.BASE_API_URL + 'api/discount/download';
//report
URLS.getReportUIdExcelUrl = environment.BASE_API_URL + 'api/reports/getReports';

URLS.getDisplayFeatureCountry = environment.BASE_API_URL + 'api/displayFeature/countryList';

// Admin dashboard 
URLS.getPaymentConAwaitedUrl = `${environment.BASE_API_URL}api/dashboard/approvals/payConfAwaited`;
URLS.getPaymentApprovalUrl = `${environment.BASE_API_URL}api/dashboard/approvals/payApproval`;
URLS.getAssignRmCount = `${environment.BASE_API_URL}api/dashboard/approvals/assignRM`;
URLS.getGrantRmCount = `${environment.BASE_API_URL}api/dashboard/approvals/assignRM/pending`;
URLS.getGrantUserCount = `${environment.BASE_API_URL}api/dashboard/approvals/grantUsers`;
URLS.getPendingKycApprovalCount = `${environment.BASE_API_URL}api/dashboard/approvals/pendingKYCApproval`;
URLS.getGrantKycCount = `${environment.BASE_API_URL}api/dashboard/approvals/grantKyc`;
URLS.getPendingKyc = `${environment.BASE_API_URL}api/dashboard/approvals/pendingKyc`;
URLS.getSubsExpiry = `${environment.BASE_API_URL}api/dashboard/approvals/subsExpiry`;
URLS.getPaymentPending = `${environment.BASE_API_URL}api/dashboard/approvals/paymentPending`;
URLS.getGrantSubscriptionCount = `${environment.BASE_API_URL}api/dashboard/approvalsEx/subscription`;
URLS.getGrantVasCount = `${environment.BASE_API_URL}api/dashboard/approvalsEx/vas`;
URLS.getGrantDiscountCouponsCount = `${environment.BASE_API_URL}api/dashboard/approvalsEx/discountCoupon`;
//revenue
URLS.getCustomerRevenue = `${environment.BASE_API_URL}api/dashboard/revenue/customer`;
URLS.getBankAsCustRevenue = `${environment.BASE_API_URL}api/dashboard/revenue/bankAsCust`;
URLS.getBankAsUwRevenue = `${environment.BASE_API_URL}api/dashboard/revenue/bankAsUw`;

URLS.getCountryAnalysis = `${environment.BASE_API_URL}api/dashboard/countryAnalysis`;
URLS.getOverAllCustomersCount = `${environment.BASE_API_URL}api/dashboard/overall/customers`;
URLS.getOverAllReferrerCount = `${environment.BASE_API_URL}api/dashboard/customer/referrer`;
URLS.getOverAllBankCount = `${environment.BASE_API_URL}api/dashboard/overall/bank`;
URLS.getCustStatTransCount = `${environment.BASE_API_URL}api/dashboard/overall/custTransactStat`;
URLS.getNewUserStatCount = `${environment.BASE_API_URL}api/dashboard/newUserStats`;
URLS.getActiveUserStat = `${environment.BASE_API_URL}api/dashboard/activeUserStats`;
URLS.getTransactionStat = `${environment.BASE_API_URL}api/dashboard/transactionStats`;
URLS.getQuotesPerTrxnStat = `${environment.BASE_API_URL}api/dashboard/quotesPerTransaction`;

//
URLS.getCustTransactionStat = `${environment.BASE_API_URL}api/dashboard/customer/transStats`;
URLS.getCustTranCompStat = `${environment.BASE_API_URL}api/dashboard/customer/tranComparision`;
URLS.getCustTrans = `${environment.BASE_API_URL}api/dashboard/customer/totalTrxn`;
URLS.getCustAccptdTrans = `${environment.BASE_API_URL}api/dashboard/customer/acceptedTrans`;
URLS.getCustRejectedTrans = `${environment.BASE_API_URL}api/dashboard/customer/rejected`;
URLS.getCustExpiredTrans = `${environment.BASE_API_URL}api/dashboard/customer/expired`;
URLS.getCustomerss = `${environment.BASE_API_URL}api/dashboard/customer/customers`;
URLS.getActiveCustTrans = `${environment.BASE_API_URL}api/dashboard/customer/activeCustTrxn`;
URLS.getTransExpiry = `${environment.BASE_API_URL}api/dashboard/customer/trxnExpiry`;
URLS.getCustPayPending = `${environment.BASE_API_URL}api/dashboard/customer/paymentPending`;
URLS.getCustKycPending = `${environment.BASE_API_URL}api/dashboard/customer/kycPending`;
URLS.getSubscriptionExp = `${environment.BASE_API_URL}api/dashboard/customer/subscriptionExpiry`;
URLS.getReferrerCount = `${environment.BASE_API_URL}api/dashboard/customer/referrer`;
//
URLS.getBankTrxnStat = `${environment.BASE_API_URL}api/dashboard/bank/transactionStats`;
URLS.getBankAvgQuotesStat = `${environment.BASE_API_URL}api/dashboard/bank/avgQuotes`;
URLS.getBankTrxnCompStat = `${environment.BASE_API_URL}api/dashboard/bank/transactionComparision`;
URLS.getBankAllTranStat = `${environment.BASE_API_URL}api/dashboard/bank/bankTrans`;
URLS.getBankAccepted = `${environment.BASE_API_URL}api/dashboard/bank/custStatusTrxn`;
URLS.getBankCustomers = `${environment.BASE_API_URL}api/dashboard/bank/totalCustomer`;
URLS.getTotalBankQuotes = `${environment.BASE_API_URL}api/dashboard/bank/totalQuotes`;
URLS.getQuotesonStatus = `${environment.BASE_API_URL}api/dashboard/bank/statusQuotes`;
URLS.getBankCount = `${environment.BASE_API_URL}api/dashboard/bank/custOruw`;
URLS.getQuotesAwaited = `${environment.BASE_API_URL}api/dashboard/bank/quotesAwaitedFromBank`;

URLS.posWwireTranferStatusUpdate = environment.BASE_API_URL + 'api/bank/wireTranferStatusUpdate';
URLS.postWireTranferList = environment.BASE_API_URL + 'api/bank/wireTransferList';
URLS.vasWireTransferList = environment.BASE_API_URL + 'api/bank/vasWireTransferList';
URLS.postRemoveSubsidiary = environment.BASE_API_URL + 'api/customer/removeSubsidiary';

URLS.postChangePasswordByUserUrl= environment.BASE_API_URL + 'api/auth/changePasswordByUser';
