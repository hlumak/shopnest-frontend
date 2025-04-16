import { useQuery } from '@tanstack/react-query';

import { getAccessToken } from '@/services/auth/auth-token.serice';
import { userService } from '@/services/user.service';

export function useProfile() {
	const accessToken = getAccessToken();

	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: !!accessToken
	});

	return { user, isLoading: isLoading && !!accessToken };
}
