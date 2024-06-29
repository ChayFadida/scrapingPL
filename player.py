class Player:
    def __init__(self, rank, name, nationality, club, stat, player_link):
        self.rank = rank
        self.name = name
        self.nationality = nationality
        self.club = club
        self.stat = stat
        self.player_link = player_link

    def __str__(self):
        return f"{self.rank}- {self.name} ({self.nationality}) - {self.stat} at {self.club}"