import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_DATABASE_ID!;
const tableId = process.env.EXPO_PUBLIC_TABLE_ID!;

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listRows({
      databaseId: databaseId,
      tableId: tableId,
      queries: [Query.equal("title", movie.title)],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];
      await database.updateRow({
        databaseId: databaseId,
        tableId: tableId,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });
    } else {
      await database.createRow({
        databaseId: databaseId,
        tableId: tableId,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          title: movie.title,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          count: 1,
          movieId: movie.id,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listRows({
      databaseId: databaseId,
      tableId: tableId,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });
    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    return undefined;
  }
};
