import { AuthService } from './backend/services/AuthService';
import { AdminService } from './backend/services/AdminService';

async function run() {
  const auth = new AuthService();
  const admin = new AdminService();
  
  console.log('Testing Packages...');
  const packages = await admin.getAllPackages();
  console.log('Initial Packages:', packages.length);
  
  console.log('Testing FAQs...');
  const faqs = await admin.getAllFAQs();
  console.log('Initial FAQs:', faqs.length);
  
  console.log('Testing Bookings...');
  const bookings = await admin.getAllBookings();
  console.log('Initial Bookings:', bookings.length);
  
  console.log('All tests completed successfully!');
}

run().catch(console.error);
