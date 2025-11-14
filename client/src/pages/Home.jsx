import { CheckCircle2, TrendingUp, Calendar, Target, Github, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';

const github_contribution_grid='/images/github_contribution_grid.png'

export default function Home() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-brrom-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="mt-6! ml-4! border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 w-8 h-8 bg-linear-to-brrom-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-white bg-green-600" />
            </div>
            <span className="text-slate-900 dark:text-slate-50 font-semibold text-xl">GitBetter</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto! px-6 py-20 md:py-32 bg-white/60">
        <div className="text-center max-w-4xl mx-auto!">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2! py-1! rounded-full mb-8 shadow-md">
            <Github className="w-5 h-5" />
            <span className="text-xl font-semibold">GitHub-style habit tracking</span>
          </div>

          <h1 className="text-slate-900 dark:text-slate-50 mb-2! mt-6! text-2xl! sm:text-5xl font-extrabold leading-tight ">
            Your growth visualized 
          </h1 >
          <h1 className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4! text-xl!">One Day at a Time</h1>

          <img src={github_contribution_grid}></img>
          <p className="text-slate-600 dark:text-slate-400 text-xl! mb-10! mt-8! text-center leading-relaxed!">
            Track your daily habits with beautiful contribution grids. See your progress at a glance and stay motivated with streaks and statistics.
          </p>

          <div className="flex items-center justify-center gap-6 mb-6!">
            <Button size="lg" className="p-5! border-transparent! rounded-sm! bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-500 hover:to-emerald-500 transition duration-300"
            onClick={()=> {navigate('signup')}}>
              Start Tracking
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl! mx-auto! px-6! py-6! bg-white/60">
        <div className="text-center! mb-11!">
          <h2 className="text-slate-900 dark:text-slate-50 mb-4! text-3xl! font-semibold!">
            Everything You Need to Build Lasting Habits
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl! ">
            Simple, powerful, and beautiful habit tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 px-4!">
          {/* Visual Progress */}
          <div className="bg-white dark:bg-slate-900 rounded-xl! p-8! border! border-slate-200! dark:border-slate-800! shadow-lg! hover:shadow-xl! transition duration-300!">
            <div className="w-12! h-12! bg-green-100 dark:bg-green-900/30! rounded-lg! flex! items-center! justify-center! mb-6!">
              <Calendar className="w-6! h-6! text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-slate-900 dark:text-slate-50 text-xl! font-semibold! mb-3!">Visual Progress</h3>
            <p className="text-slate-600 dark:text-slate-400">
              See your entire year at a glance with GitHub-style contribution grids. Every completion adds to your visual streak.
            </p>
          </div>

          {/* Track Statistics */}
          <div className="bg-white dark:bg-slate-900 rounded-xl! p-8! border! border-slate-200! dark:border-slate-800! shadow-lg! hover:shadow-xl! transition duration-300!">
            <div className="w-12! h-12! bg-blue-100 dark:bg-blue-900/30! rounded-lg! flex! items-center! justify-center! mb-6!">
              <TrendingUp className="w-6! h-6! text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-slate-900 dark:text-slate-50 text-xl! font-semibold! mb-3!">Track Statistics</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor your progress with weekly, monthly, and total completion counts. Build streaks and stay motivated.
            </p>
          </div>

          {/* Flexible Goals */}
          <div className="bg-white dark:bg-slate-900 rounded-xl! p-8! border! border-slate-200! dark:border-slate-800! shadow-lg! hover:shadow-xl! transition duration-300!">
            <div className="w-12! h-12! bg-violet-100 dark:bg-violet-900/30! rounded-lg! flex! items-center! justify-center! mb-6!">
              <Target className="w-6! h-6! text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-slate-900 dark:text-slate-50 text-xl! font-semibold! mb-3!">Flexible Goals</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Set daily, weekly, or monthly goals for each habit. Track multiple completions per day for habits you do more than once.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl! mx-auto! px-6! py-8!">
        <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl! p-12! text-center! shadow-lg!">
          <h2 className="text-white text-3xl! font-semibold! mb-6!">Ready to Build Better Habits?</h2>
          <p className="text-green-100 text-xl! mb-8! max-w-2xl! mx-auto!">
            Start tracking your habits today and see your progress grow over time.
          </p>
            <Button size="lg" className="p-5! border-transparent! rounded-sm! bg-linear-to-r from-gray-100 to-gray-300 text-white shadow-lg hover:from-gray-200 hover:to-gray-400 transition duration-300"
            onClick={()=> {navigate('signup')}}>
              Start Tracking
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </section>
    </div>
  );
}
