 import html2pdf from 'html2pdf.js';

export interface PDFExportOptions {
  filename?: string;
  margin?: number;
  format?: 'a4' | 'letter';
}

export const exportToPDF = async (
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    filename = 'resume.pdf',
    margin = 0,
    format = 'letter',
  } = options;

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Set explicit dimensions for the clone
  clone.style.width = '8.5in';
  clone.style.minHeight = '11in';
  clone.style.padding = '0';
  clone.style.margin = '0';
  clone.style.background = 'white';
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  
  // Append to body temporarily
  document.body.appendChild(clone);

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 816, // 8.5 inches * 96 DPI
      windowHeight: 1056, // 11 inches * 96 DPI
    },
    jsPDF: {
      unit: 'in',
      format,
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(clone).save();
    // Clean up
    document.body.removeChild(clone);
  } catch (error) {
    console.error('PDF export failed:', error);
    document.body.removeChild(clone);
    throw new Error('Failed to export PDF');
  }
};

export const previewPDF = async (element: HTMLElement): Promise<void> => {
  const opt = {
    margin: 0,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
    },
  };

  try {
    const pdf = await html2pdf().set(opt).from(element).toPdf().get('pdf');
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (error) {
    console.error('PDF preview failed:', error);
    throw new Error('Failed to preview PDF');
  }
};