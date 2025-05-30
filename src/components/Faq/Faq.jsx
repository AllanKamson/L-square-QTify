import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Faq.module.css';
//import { StyleSharp } from '@mui/icons-material';

const faqlist = [
  {
    summary: 'Is QTify free to use?',
    details: 'Yes, It is free to use!'
  },
  {
    summary: 'Can I download and listen to songs offline?',
    details: 'Sorry, unfortunately we don\'t provide the service to download any songs.'
  }
]



export default function Faq() {
  return (
    <Box className={styles.faqAccordion} sx={{ py: 10 }}>
      <h1 style={{ textAlign: 'center' }}>
        FAQs
      </h1>
      {
        faqlist.map(({ summary, details }, index) => {
          return (
            <div className={styles.accordionWrapper} key={index}>
              <Accordion >
                <AccordionSummary
                  className={styles.accordionSummary}
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{summary}</Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  <Typography>
                    {details}
                  </Typography>
                </AccordionDetails>
              </Accordion>

            </div>
          )

        })
      }
    </Box>
  );
}