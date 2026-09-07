const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export const exportCanvasAsPdf = async (canvas: HTMLCanvasElement, fileName: string, title: string) => {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  pdf.setProperties({ title, creator: 'KidRise Science' });
  pdf.addImage(canvas.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, undefined, 'FAST');
  pdf.save(fileName.replace(/[^a-zA-Z0-9._-]/g, '-'));
};
