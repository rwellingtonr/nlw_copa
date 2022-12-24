import { GetStaticProps } from "next";
import Image from "next/image";
import appPreview from "~/assets/app-nlw-copa-preview.png";
import iconCheck from "~/assets/iconCheck.svg";
import usersAvatar from "~/assets/users-avatar.png";
import appLogo from "~/assets/logo.svg";
import { FormEvent, useState } from "react";
import { getAllCounter } from "~/lib/counter";
import { createPool } from "~/lib/pool";
import { useToast } from "~/context/toastProvider";

type HomeProps = {
	guessCount: number;
	poolCount: number;
	userCount: number;
};

export default function Home({ guessCount, poolCount, userCount }: HomeProps) {
	const [title, setTitle] = useState("");
	const { showToast } = useToast();

	const handleCreatePool = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title) return;
		try {
			const response = await createPool({ title });
			console.log(`Response ${response}`);
			showToast(`Seu palpite: '${response.title}' foi enviado com sucesso`);
			await navigator.clipboard.writeText(response.title);
		} catch (err) {
			showToast(`Erro ao cadastrar o seu palpite`, "error");
			console.error(err);
		} finally {
			setTitle("");
		}
	};

	return (
		<div className="max-w-[1124px] h-screen mx-2 xl:mx-auto my-2 grid grid-cols-1 md:grid-cols-2  gap-10 md:gap-20 xl:gap-32 items-center">
			<main>
				<Image src={appLogo} alt="SVG da logo da aplicação" quality={90} />

				<h1 className="mt-16 leading-tight text-white text-3xl md:text-4xl lg:text-5xl font-bold">
					Crie seu próprio bolão da copa e compartilhe com os amigos!
				</h1>

				<div className="flex items-center mt-10 gap-2">
					<Image src={usersAvatar} alt="Avatar dos usuários" />
					<strong className="text-gray-100 text-md md:text-lg">
						<span className="text-ignite-500">+{userCount}</span> pessoas já estão utilizando
					</strong>
				</div>

				<form className="mt-10 flex gap-2" onSubmit={handleCreatePool}>
					<input
						required
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						className="flex-1 px-6 py-2 rounded text-gray-100 bg-gray-800 border-gray-600 text-md"
						type="text"
						name="guess"
						id="guess"
						placeholder="Qual é o seu palpite"
					/>
					<button
						type="submit"
						className="bg-yellow-500 font-bold text-gray-900 text-xs sm:text-sm uppercase px-3 sm:px-6 py-4 rounded hover:bg-yellow-600 ease-in"
					>
						criar o meu bolão
					</button>
				</form>

				<p className="text-gray-300 text-sm mt-4 leading-relaxed">
					Após criar o seu bolão, você receberá um código único que poderá usar para convidar
					qualquer pessoa 🚀
				</p>

				<div className="flex items-center justify-between mt-10 p-10 border-t text-gray-100 border-gray-600 ">
					<div className="flex items-center gap-6">
						<Image src={iconCheck} alt="Ícone verde que simboliza que o item está conferido" />
						<div className="flex flex-col">
							<span className="text-2xl font-bold">+{poolCount}</span>
							<span>Bolões criados</span>
						</div>
					</div>
					<div className="w-px h-14	 bg-gray-600" />

					<div className="flex items-center gap-6">
						<Image src={iconCheck} alt="Ícone verde que simboliza que o item está conferido" />
						<div className="flex flex-col">
							<span className="text-2xl font-bold">+{guessCount}</span>
							<span>Palpites enviados</span>
						</div>
					</div>
				</div>
			</main>
			<Image src={appPreview} alt="pre visualização do app" />
		</div>
	);
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const { guessCount, poolCount, userCount } = await getAllCounter();
	console.log(`Guess: ${guessCount} -- userCount: ${userCount} -- pools: ${poolCount}`);

	return {
		props: {
			guessCount,
			poolCount,
			userCount,
		},

		revalidate: 60,
	};
};
