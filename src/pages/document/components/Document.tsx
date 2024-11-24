import { sidebarOptions, SidebarItemType } from '@/constants/sidebarOptions';

interface DocumentProps {
  selectedId: SidebarItemType;
}

const Document = ({ selectedId }: DocumentProps) => {
  const selectedOption = sidebarOptions.find(option => option.id === selectedId);
  const SelectedComponent = selectedOption?.component;

  return (
    <div className="p-4">
      {SelectedComponent && <SelectedComponent />}
    </div>
  );
};

export default Document;