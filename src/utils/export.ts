import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { ProjectionsType } from '../types';
import { formatCurrency } from './formatting';

export function exportToPDF(projections: ProjectionsType) {
  const doc = new jsPDF({
    unit: 'in',
    format: 'letter' // 8.5" x 11"
  });
  
  const margin = 1; // 1 inch margins
  const pageWidth = 8.5;
  const contentWidth = pageWidth - (margin * 2);
  
  // Set default font
  doc.setFont('helvetica');
  
  // Add title with gradient background
  doc.setFillColor(99, 102, 241); // Indigo color
  doc.rect(margin, margin, contentWidth, 1.2, 'F');
  doc.setTextColor(255);
  doc.setFontSize(24);
  doc.text('Retirement Analysis Report', margin + 0.2, margin + 0.5);
  
  // Add date
  doc.setTextColor(255);
  doc.setFontSize(10);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated on ${currentDate}`, margin + 0.2, margin + 0.8);
  
  // Results Summary section
  let yPos = margin + 1.8;
  
  doc.setTextColor(0);
  doc.setFontSize(20);
  doc.text('Results Summary', margin, yPos);
  yPos += 0.5;

  const metrics = [
    {
      title: 'Monthly Withdrawal',
      value: formatCurrency(projections.monthlyWithdrawal),
      subtitle: 'Sustainable monthly withdrawal amount'
    },
    {
      title: 'Portfolio Longevity',
      value: `${projections.portfolioLongevity} years`,
      subtitle: 'Expected duration of savings'
    },
    {
      title: 'Success Rate',
      value: `${projections.successRate}%`,
      subtitle: 'Monte Carlo simulation success'
    },
    {
      title: 'Legacy Amount',
      value: formatCurrency(projections.legacyAmount),
      subtitle: 'Estimated inheritance amount'
    }
  ];

  // Create metrics grid with highlight boxes
  metrics.forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const xPos = margin + (col * (contentWidth / 2));
    const metricYPos = yPos + (row * 1.2);

    // Add highlight box
    doc.setFillColor(243, 244, 246); // Light gray background
    doc.roundedRect(xPos, metricYPos - 0.1, (contentWidth / 2) - 0.2, 0.8, 0.1, 0.1, 'F');

    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99);
    doc.text(metric.title, xPos + 0.1, metricYPos + 0.15);

    doc.setFontSize(18);
    doc.setTextColor(99, 102, 241); // Indigo color for value
    doc.text(metric.value, xPos + 0.1, metricYPos + 0.45);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(metric.subtitle, xPos + 0.1, metricYPos + 0.65);
  });

  // Move position below metrics grid
  yPos += 2.8;

  // Key Insights section
  doc.setTextColor(0);
  doc.setFontSize(20);
  doc.text('Key Insights', margin, yPos);
  yPos += 0.4;

  // Add insights with bullet points and highlights
  doc.setFontSize(11);
  projections.insights.forEach((insight) => {
    // Split insight into parts based on markdown bold syntax
    const parts = insight.split(/\*\*(.*?)\*\*/);
    
    // Add bullet point
    doc.setTextColor(99, 102, 241);
    doc.text('•', margin, yPos);
    
    let xPos = margin + 0.2; // Starting position after bullet point
    const maxWidth = contentWidth - 0.4; // Available width for text
    let currentLine = '';
    let currentParts: { text: string; highlighted: boolean }[] = [];
    
    // Process each part of the insight
    parts.forEach((part, index) => {
      // Split the part into words
      const words = part.split(' ');
      const isHighlighted = index % 2 === 1; // Every odd index is highlighted (inside **)
      
      words.forEach((word) => {
        const spaceWidth = doc.getTextWidth(' ');
        const wordWidth = doc.getTextWidth(word);
        const lineWidth = doc.getTextWidth(currentLine);
        
        // Check if adding this word would exceed the line width
        if (currentLine && lineWidth + spaceWidth + wordWidth > maxWidth) {
          // Write the current line
          let xOffset = xPos;
          currentParts.forEach(({ text, highlighted }) => {
            if (highlighted) {
              doc.setTextColor(99, 102, 241);
              doc.setFont('helvetica', 'bold');
            } else {
              doc.setTextColor(55, 65, 81);
              doc.setFont('helvetica', 'normal');
            }
            doc.text(text, xOffset, yPos);
            xOffset += doc.getTextWidth(text);
          });
          
          // Reset for new line
          yPos += 0.25;
          currentLine = word;
          currentParts = [{ text: word, highlighted: isHighlighted }];
          xPos = margin + 0.2;
        } else {
          // Add word to current line
          if (currentLine) {
            currentLine += ' ' + word;
            currentParts.push({ text: ' ' + word, highlighted: isHighlighted });
          } else {
            currentLine = word;
            currentParts.push({ text: word, highlighted: isHighlighted });
          }
        }
      });
    });
    
    // Write any remaining text
    if (currentLine) {
      let xOffset = xPos;
      currentParts.forEach(({ text, highlighted }) => {
        if (highlighted) {
          doc.setTextColor(99, 102, 241);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setTextColor(55, 65, 81);
          doc.setFont('helvetica', 'normal');
        }
        doc.text(text, xOffset, yPos);
        xOffset += doc.getTextWidth(text);
      });
    }
    
    yPos += 0.35; // Space between insights
  });

  // Footer with gradient bar and disclaimer
  const footerYPos = 10 - margin;
  
  doc.setFillColor(99, 102, 241, 0.1);
  doc.rect(margin, footerYPos - 0.4, contentWidth, 0.4, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  const disclaimer = 'This report is for informational purposes only and should not be considered financial advice.';
  doc.text(disclaimer, margin + 0.1, footerYPos - 0.2);
  
  // Save the PDF
  doc.save('retirement-analysis.pdf');
}

export function exportToExcel(projections: ProjectionsType) {
  const workbook = XLSX.utils.book_new();
  
  const summaryData = [
    ['Summary'],
    ['Monthly Withdrawal', projections.monthlyWithdrawal],
    ['Portfolio Longevity', projections.portfolioLongevity],
    ['Success Rate', projections.successRate],
    ['Legacy Amount', projections.legacyAmount],
    [],
    ['Key Insights'],
    ...projections.insights.map(insight => [insight])
  ];
  
  const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summaryWS, 'Summary');
  
  const projectionsData = [
    ['Year', 'Balance', 'Withdrawal'],
    ...projections.years.map((year, index) => [
      year,
      projections.balances[index],
      projections.withdrawals[index]
    ])
  ];
  
  const projectionsWS = XLSX.utils.aoa_to_sheet(projectionsData);
  XLSX.utils.book_append_sheet(workbook, projectionsWS, 'Projections');
  
  XLSX.writeFile(workbook, 'retirement-analysis.xlsx');
}