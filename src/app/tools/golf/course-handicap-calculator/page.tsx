import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/course-handicap-calculator/Calculator';
import Explainer from '@/tools/course-handicap-calculator/Explainer';
import meta from '@/tools/course-handicap-calculator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
