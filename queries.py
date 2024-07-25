from prettytable import PrettyTable
from plScraper import PremierLeagueScraper, StatType
import csv

class PremierLeagueQueries:

    @staticmethod
    def  printTopIntersectionPlayers(intersectionLst, top_x, export_csv=False, filename="intersection_players.csv"):
        player_stats = {}
        num_pages = max(1, (top_x // 10))
        for stat in intersectionLst:
            scraper = PremierLeagueScraper(stat, num_pages=num_pages, headless=True)
            players = scraper.scrape()
            for player in players:
                if player.name not in player_stats:
                    player_stats[player.name] = {}
                player_stats[player.name][stat] = player.stat
                
        intersection_players = {player: stats for player, stats in player_stats.items() if len(stats) == len(intersectionLst)}

        table = PrettyTable()
        table.field_names = ["Player Name"] + [stat.value if isinstance(stat.value, str) else stat.value[0] for stat in intersectionLst]

        for player, stats in intersection_players.items():
            table.add_row([player, stats.get(StatType.SHOTS), stats.get(StatType.GOAL)])

        print(table)
        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Player Name"] + [stat.value if isinstance(stat.value, str) else stat.value[0] for stat in intersectionLst])
                for player, stats in intersection_players.items():
                    writer.writerow([player] + [stats.get(stat) for stat in intersectionLst])
            print(f"Data has been exported to {filename}")
        return intersection_players

    @staticmethod
    def printTopPlayersByLastName(stat, start_char, top_x, export_csv=False, filename="players_by_last_name.csv"):
        num_pages = max(1, (top_x // 10))
        scraper = PremierLeagueScraper(stat, num_pages=num_pages, headless=True)
        players = scraper.scrape()
        filtered_players = [player for player in players if player.name.split()[-1].startswith(start_char)]
        filtered_players = filtered_players[:top_x]

        table = PrettyTable()
        table.field_names = ["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"]
        for player in filtered_players:
            table.add_row([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])

        print(f"\n\nTop {top_x} players with last names starting with '{start_char}'")
        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"])
                for player in filtered_players:
                    writer.writerow([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])
            print(f"Data has been exported to {filename}")

if __name__ == "__main__":
    # Example for intersection players
    PremierLeagueQueries.printTopIntersectionPlayers([StatType.SHOTS, StatType.GOAL], 100, export_csv=True)
    
    # Example for players by last name
    PremierLeagueQueries.printTopPlayersByLastName(StatType.GOAL, 'R', 100, export_csv=True)
