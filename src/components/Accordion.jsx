import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Accordions({ faqs }) {
  return (
    <Accordion collapsible defaultValue={`item0`}>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item${index}`}>
          <AccordionTrigger className="text-left">
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
