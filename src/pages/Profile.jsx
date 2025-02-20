function Profile() {
  return (
    <div className="max-w-dashboard mx-auto p-8 min-h-dashboard">
      {/* Dashboard Header */}
      <header className="flex items-center justify-between mb-8">
        {/* Contenu du header */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">SportSee</h1>
        </div>
      </header>

      {/* Dashboard Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteneurs des graphiques */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          {/* Graphique 1 */}
        </div>
        {/* Autres graphiques */}
      </div>
    </div>
  );
}

export default Profile;
