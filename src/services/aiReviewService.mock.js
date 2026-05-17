import { buildMockReport } from '../data/mockReport.js';

export async function generateMockReview(work) {
  return buildMockReport(work);
}
