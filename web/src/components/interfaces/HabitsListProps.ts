export default interface HabitsListProps {
  date: Date;
  handleCheckChanges: (completed: number) => void;
};