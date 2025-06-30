import { Alert } from '@/components/ui/alert';

export interface ErrorMessageProps {
	message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
	return <Alert variant="destructive">{message}</Alert>;
}
