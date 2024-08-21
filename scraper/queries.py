import time
from prettytable import PrettyTable
from plScraper import *
import csv

class PremierLeagueQueries:

    @staticmethod
    def printTopIntersectionPlayers(intersectionLst, top_x, export_csv=False, filename="intersection_players.csv"):
        start_time = time.time()
        player_stats = {}
        player_details = {}  # Dictionary to store additional player details
        num_pages = max(1, (top_x // 10))
        
        for stat in intersectionLst:
            scraper = PremierLeagueStatScraper(stat, num_pages=num_pages, headless=True)
            players = scraper.scrape()
            for player in players:
                if player.name not in player_stats:
                    player_stats[player.name] = {}
                    player_details[player.name] = {
                        'nationality': player.nationality,
                        'club': player.club,
                        'player_link': player.player_link
                    }
                player_stats[player.name][stat] = player.stat

        intersection_players = {player: stats for player, stats in player_stats.items() if len(stats) == len(intersectionLst)}

        # Create PrettyTable with field names
        table = PrettyTable()
        field_names = ["Player Name", "Nationality", "Club", "Player Link"] + [stat.value for stat in intersectionLst]
        table.field_names = field_names

        for player, stats in intersection_players.items():
            row = [
                player,
                player_details[player]['nationality'],
                player_details[player]['club'],
                player_details[player]['player_link'],
            ]
            row.extend([stats.get(stat) for stat in intersectionLst])
            table.add_row(row)

        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(field_names)  # Write the header row
                for player, stats in intersection_players.items():
                    row = [
                        player,
                        player_details[player]['nationality'],
                        player_details[player]['club'],
                        player_details[player]['player_link'],
                    ]
                    row.extend([stats.get(stat) for stat in intersectionLst])
                    writer.writerow(row)  # Write each player's data
            print(f"Data has been exported to {filename}")

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")

        return intersection_players

    @staticmethod
    def printTopPlayersByLastName(stat, start_char, top_x, export_csv=False, filename="players_by_last_name.csv"):
        start_time = time.time()
        num_pages = max(1, (top_x // 10))
        scraper = PremierLeagueStatScraper(stat, num_pages=num_pages, headless=True)
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

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")

    @staticmethod
    def printTopEnglandPlayersByPassesForLondonClubs(top_x, export_csv=False, filename="england_passes_london_clubs.csv"):
        start_time = time.time()
        stat = StatType.PASSES
        num_pages = 10
        scraper = PremierLeagueStatScraper(stat, num_pages=num_pages, headless=True)
        players = scraper.scrape()
        
        london_clubs = ["Arsenal", "Chelsea", "Tottenham Hotspur", "West Ham United", "Crystal Palace", "Fulham", "Brentford"]
        filtered_players = [player for player in players if player.nationality == "England" and player.club in london_clubs]
        filtered_players = filtered_players[:top_x]

        table = PrettyTable()
        table.field_names = ["Rank", "Player Name", "Nationality", "Club", "Passes", "Player Link"]
        for player in filtered_players:
            table.add_row([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])

        print(f"\n\nTop {top_x} England players by passes in all seasons for London clubs")
        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Rank", "Player Name", "Nationality", "Club", "Passes", "Player Link"])
                for player in filtered_players:
                    writer.writerow([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])
            print(f"Data has been exported to {filename}")

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")

    @staticmethod
    def printTopGoalkeepersByCleanSheetsOutsideEurope(top_x, export_csv=False, filename="goalkeepers_clean_sheets_outside_europe.csv"):
        start_time = time.time()
        stat = StatType.CLEAN_SHEETS
        num_pages = 10
        scraper = PremierLeagueStatScraper(stat, num_pages=num_pages, headless=True)
        players = scraper.scrape()
        europe_countries = ["England", "Germany", "France", "Italy", "Spain", "Netherlands", "Portugal",
                            "Belgium", "Sweden", "Denmark", "Norway", "Switzerland", "Greece", "Ireland",
                            "Scotland", "Austria", "Poland", "Croatia", "Serbia", "Russia"]
        filtered_players = [player for player in players if player.nationality not in europe_countries]
        filtered_players = filtered_players[:top_x]

        table = PrettyTable()
        table.field_names = ["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"]
        for player in filtered_players:
            table.add_row([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])

        print(f"\n\nTop {top_x} goalkeepers by clean sheets with nationality outside Europe")
        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"])
                for player in filtered_players:
                    writer.writerow([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])
            print(f"Data has been exported to {filename}")

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")

    
    @staticmethod
    def printTransfersIpswichTown(export_csv=False, filename="IpswichTown_TransferIn_LoanOut.csv"):
        start_time = time.time()
        query_results =[]
        scraper = PremierLeagueTransferScraper(headless=True)
        transfers = scraper.scrape()

        table = PrettyTable()
        table.field_names = ["Player Name", "Transfer Type", "Transfer Link", "Club"]
        for transfer in transfers:
            if transfer['transfer_type'] == 'Transfer In' or transfer['transfer_type'] == 'Loan Out':
                table.add_row([transfer['player_name'], transfer['transfer_type'], transfer['transfer_type_link'], transfer['club']])
                query_results.append(transfer)

        print(f"\n\nTransfer In and Loan out in Ipswich Town")
        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"])
                for query_result in query_results:
                    writer.writerow([query_result['player_name'], query_result['transfer_type'], query_result['transfer_type_link'], query_result['club']])
            print(f"Data has been exported to {filename}")

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")
        
    @staticmethod
    def printPalyerAndManagerAwardsOutOfLondon(export_csv=False, filename="Player_Manager_OfTheMonth_Award.csv"):
        start_time = time.time()
        london_clubs = ["Arsenal", "Chelsea", "Tottenham Hotspur", "West Ham United", "Crystal Palace", "Fulham", "Brentford"]
        query_results =[]
        awardScraper = PremierLeagueAwardScraper(headless=True)
        awards = awardScraper.scrape()
        for award in awards:
            clubScraper = PremierLeagueClubScraper(base_url=award['profile'], headless=True)
            club = clubScraper.scrape()
            if club not in london_clubs and ( award['award_type'].startswith('PLAYER_OF_THE_MONTH') or award['award_type'].startswith('MANAGER_OF_THE_MONTH')):
                award['club'] = club
                query_results.append(award)
            
        table = PrettyTable()
        table.field_names = ["Award", "Club","Url"]
        for query_result in query_results:
                table.add_row([query_result['award_type'], query_result['club'],query_result['news']])

        print(f"\n\nTransfer In and Loan out in Ipswich Town")
        print(table)

        if export_csv:
            with open(filename, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(["Award", "Club","Url"])
                for query_result in query_results:
                    writer.writerow([query_result['award_type'], query_result['club'],query_result['news']])
            print(f"Data has been exported to {filename}")

        end_time = time.time()
        duration = end_time - start_time
        print(f"Query run time: {duration:.2f} seconds")

if __name__ == "__main__":
    # PremierLeagueQueries.printTopEnglandPlayersByPassesForLondonClubs(5, export_csv=True)
    # PremierLeagueQueries.printTopGoalkeepersByCleanSheetsOutsideEurope(10, export_csv=True)
    # PremierLeagueQueries.printTransfersIpswichTown(export_csv=True)
    PremierLeagueQueries.printPalyerAndManagerAwardsOutOfLondon(export_csv=True)
