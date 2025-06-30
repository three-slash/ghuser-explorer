import { SearchBar } from '@/components/SearchBar';
import { UserList } from '@/components/UserList';
import { BackgroundLines } from '@/components/ui/background-lines';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const currentYear = new Date().getFullYear();

function App() {
	return (
		<ReactQueryProvider>
			<ThemeProvider>
				<div className="max-w-sm md:max-w-xl min-h-screen flex flex-col mx-auto justify-center py-12">
					<BackgroundLines>
						<div className="bg-background text-foreground dark:bg-transparent relative z-[99999]">
							<Header />

							<BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
								<div className="mb-8 flex flex-col items-center justify-center gap-4">
									<SearchBar />
								</div>
								<UserList />
							</BackgroundGradient>
							<Footer year={currentYear} />
						</div>
					</BackgroundLines>
				</div>
			</ThemeProvider>
		</ReactQueryProvider>
	);
}

export default App;
