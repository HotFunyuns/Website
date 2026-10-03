import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import Calculator from '@/tools/draft-order-generator/Calculator';
import Explainer from '@/tools/draft-order-generator/Explainer';
import meta from '@/tools/draft-order-generator/meta';

export const metadata = toolMetadata(meta);

export default function Page() {
  return <ToolPage tool={meta} Calculator={Calculator} Explainer={Explainer} />;
}
