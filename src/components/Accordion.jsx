import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Accordions({ faqs }) {
  return (
    <Accordion collapsible>
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="font-normal">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base dark:text-slate-400">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
